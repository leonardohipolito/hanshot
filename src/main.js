'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');
var _ = require('lodash');

var Screen = require('./screen');
var Settings = require('./settings');
var Cache = require('./cache');
var Api = require('./api');
var Tray = require('./tray');
var Provider = require('./provider');
var Dispatcher = require('./dispatcher');
var Gallery = require('./image/gallery');

var windows = {
  Dashboard: require('./windows/dashboard'),
  Settings: require('./windows/settings'),
  Selection: require('./windows/selection')
};

var cli = require('./cli');
var uploaders = require('./uploaders');

var app = electron.app;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var isLinux = (process.platform === 'linux');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

// Initialize variables used inside app.on('ready'),
// so they won't be garbage collected when handler executes
var api = null;
var tray = null;

// ---

// Keep one running instance and prevent second instance from starting
var shouldQuit = app.makeSingleInstance(function (argv, workdir) {
  console.log('There is an already running instance');
  var args = argv.slice(2);

  if (!api) {
    console.log('Unable to use already running instance');
    return;
  }

  if (!args.length) {
    api.openWindow();
    return;
  }

  var action = cli.parseAction(args);
  if (action.capture === 'desktop') {
    api.captureDesktop();
  } else if (action.capture === 'selection') {
    api.captureSelection();
  } else if (action.capture === 'window') {
    api.captureWindow();
  }
});

if (shouldQuit) {
  app.quit();
  return;
}

// ---

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  var args = process.argv.slice(2);
  var action = cli.parseAction(args);

  var dashboardWindow = new windows.Dashboard();
  var settingsWindow = new windows.Settings();
  var selectionWindow = new windows.Selection();

  var dispatcher = new Dispatcher();

  var settings = new Settings();
  var cache = new Cache();
  var screen = new Screen();
  var gallery = new Gallery(cache.get('recent', []));

  // Create providers

  var displaysProvider = new Provider(function (params, provide) {
    provide(null, screen.getDisplayList());
  });

  var windowsProvider = new Provider(function (params, provide) {
    screen.getWindowList(function (err, data) {
      provide(err, data);
    });
  });

  var settingsProvider = new Provider(function (params, provide) {
    provide(null, settings.serialize());
  });

  var uploadersProvider = new Provider(function (params, provide) {
    var uploadersList = uploaders.getList();

    var defaultUploader = settings.get('default-uploader');
    if (defaultUploader) {
      uploadersList.forEach(function (uploader) {
        uploader.isDefault = defaultUploader === uploader.id;
      });
    }

    provide(null, uploadersList);
  });

  var imageProvider = new Provider(function (param, provide) {
    provide(null, gallery.last());
  });

  // Listen providers

  displaysProvider.addUpdateListener(function (err, data) {
    dashboardWindow.updateState({ displays: data });
  });

  windowsProvider.addUpdateListener(function (err, data) {
    dashboardWindow.updateState({ windows: data });
  });

  settingsProvider.addUpdateListener(function (err, data) {
    settingsWindow.updateState({ settings: data });
  });

  uploadersProvider.addUpdateListener(function (err, data) {
    dashboardWindow.updateState({ uploaders: data });
    settingsWindow.updateState({ uploaders: data });
  });

  imageProvider.addUpdateListener(function (err, data) {
    dashboardWindow.updateState({ image: data });
  });

  // Create windows

  var quitApp = function () {
    var recentPaths = gallery.getPaths();
    cache.set('recent', recentPaths);

    // TODO: use promises or callbacks to make async writes
    // now cache and settings are saved synchronously (is it bad?)
    screen.destroy();
    cache.save();
    settings.save();
    app.quit();
  };

  dashboardWindow.open(action);
  dashboardWindow.on('close', function () {
    if (settings.get('tray-on-close')) {
      cache.save();
      settings.save();
    } else {
      quitApp();
    }
  });

  settingsWindow.on('close', function () {
    settings.save();
  });

  // Trigger providers

  dashboardWindow.on('ready', function () {
    displaysProvider.triggerUpdate();
    windowsProvider.triggerUpdate();
    uploadersProvider.triggerUpdate();
    imageProvider.triggerUpdate();
  });

  settingsWindow.on('ready', function (event) {
    settingsProvider.triggerUpdate();
    uploadersProvider.triggerUpdate();
  });

  gallery.on('added', function (image) {
    imageProvider.triggerUpdate();
  });

  screen.on('display-added', function () {
    displaysProvider.triggerUpdate();
  });

  screen.on('display-removed', function () {
    displaysProvider.triggerUpdate();
  });

  screen.on('display-updated', function () {
    displaysProvider.triggerUpdate();
  });

  // Work with actions

  // TODO: decide if API is required, maybe just gather all major instances
  api = new Api(
    dashboardWindow, settingsWindow, selectionWindow,
    screen, settings, cache, gallery
  );

  tray = new Tray();

  tray.on('action', dispatcher.dispatch.bind(dispatcher));
  dashboardWindow.on('action', dispatcher.dispatch.bind(dispatcher));
  settingsWindow.on('action', dispatcher.dispatch.bind(dispatcher));

  dispatcher.register(function (action) {
    switch (action.actionName) {
      case 'capture-desktop':
        api.captureDesktop(action.displayId);
        break;
      case 'capture-selection':
        api.captureSelection(action.displayId);
        break;
      case 'capture-window':
        api.captureWindow(action.windowId);
        break;
      case 'open-dashboard':
        api.openDashboard();
        break;
      case 'open-settings':
        api.openSettings();
        break;
      case 'import-clipboard':
        api.importFile();
        break;
      case 'import-open':
        electron.dialog.showOpenDialog({
          defaultPath: electron.app.getPath('pictures'),
          properties: ['openFile'],
          filters: [
            {
              name: 'All Compatible Image Formats',
              extensions: ['jpg', 'png']
            }
          ],
        }, function (filePaths) {
          if (!filePaths) {
            // "Cancel" pressed
            return;
          }
          var filePath = filePaths[0];
          api.openFile(filePath);
        });
        break;
      case 'save-as':
        var image = gallery.last();
        if (!image) {
          return;
        }
        electron.dialog.showSaveDialog({
          defaultPath: path.join(electron.app.getPath('pictures'), image.getFileName()),
          filters: [
            {
              name: 'All Compatible Image Formats',
              extensions: ['jpg', 'png']
            },
            { name: 'PNG', extensions: ['png'] },
            { name: 'JPEG', extensions: ['jpg'] }
          ]
        }, function (filePath) {
          if (!filePath) {
            // "Cancel" pressed
            return;
          }
          api.saveFileAs(filePath, image);
        });
        break;
      case 'upload':
        var image = gallery.find(action.filePath);
        if (!image) {
          return;
        }

        var Uploader;

        if (action.uploaderId) {
          Uploader = uploaders[action.uploaderId];
        } else {
          var defaultUploader = settings.get('default-uploader');
          if (defaultUploader) {
            Uploader = uploaders[defaultUploader];
          } else {
            Uploader = uploaders.getDefault();
          }
        }

        var uploader = new Uploader(cache);

        uploader.upload(image, function (err, link) {
          if (err) throw err;

          electron.clipboard.writeText(link);

          console.log('Uploaded');
          console.log(link);

        });
        break;
      case 'copy':
        var copyId = data.copyId || 'image';

        var image = gallery.find(data.filePath);
        if (!image) {
          return;
        }

        if (copyId === 'image') {
          electron.clipboard.writeImage(image.getNative());
        } else if (copyId === 'fileName') {
          electron.clipboard.writeText(image.getFileName());
        } else if (copyId === 'filePath') {
          electron.clipboard.writeText(image.getFilePath());
        }
        break;
      case 'force-quit':
        quitApp();
        break;
      case 'settings-changed':
        settings.set(action.key, action.value);
        break;
      case 'settings-dialog':
        electron.dialog.showOpenDialog({
          defaultPath: settings.get('save-dir'),
          properties: ['openDirectory', 'createDirectory']
        }, function (directoryPaths) {
          if (!directoryPaths) {
            // "Cancel" pressed
            return;
          }
          var directoryPath = directoryPaths[0];
          settings.set('save_dir', directoryPath);
          event.sender.send('settings-updated', settings.serialize());
        });
        break;
    }
  });

  if (action.capture === 'desktop') {
    api.captureDesktop();
  } else if (action.capture === 'selection') {
    api.captureSelection();
  } else if (action.capture === 'window') {
    api.captureWindow();
  }

  // "printscreen" is not supported yet. FUCK
  // https://github.com/atom/electron/issues/4663
  // var isNowRegistered = electron.globalShortcut.register('ctrl+p', function () {
  //   snapshot();
  // });

  // if (!isNowRegistered) {
  //   console.log('registration failed');
  // }

});
