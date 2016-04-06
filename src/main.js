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

var windows = {
  Dashboard: require('./windows/dashboard'),
  Settings: require('./windows/settings')
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
var controller = null;

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

if (isLinux) {
  // http://electron.atom.io/docs/v0.36.8/api/frameless-window/#limitations
  // Alpha channel doesn’t work on some NVidia drivers on Linux
  app.commandLine.appendSwitch('enable-transparent-visuals');
  app.commandLine.appendSwitch('disable-gpu');
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

  var settings = new Settings();
  var cache = new Cache();
  var screen = new Screen();

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
    provide(null, settings.get());
  });

  var uploadersProvider = new Provider(function (params, provide) {
    var uploadersList = uploaders.getList();

    var defaultUploader = settings.get('default_uploader');
    if (defaultUploader) {
      uploadersList.forEach(function (uploader) {
        uploader.isDefault = defaultUploader === uploader.id;
      });
    }

    provide(null, uploadersList);
  });

  var imageProvider = new Provider(function (param, provide) {
    var recent = cache.get('recent', []);
    if (!recent.length) {
      return provide(null, null);
    }

    var filePath = recent[0];

    fs.readFile(filePath, function (err, buffer) {
      if (err) {
        if (err.code === 'ENOENT') {
          return provide(null, null);
        } else {
          return provide(err);
        }
      }

      var image = electron.nativeImage.createFromBuffer(buffer);
      var imageSize = image.getSize();

      provide(null, {
        filePath: filePath,
        fileName: path.basename(filePath),
        dataURL: image.toDataURL(),
        width: imageSize.width,
        height: imageSize.height
      });

    });
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

  dashboardWindow.open(action);
  dashboardWindow.on('close', function () {
    screen.destroy();
    cache.save();
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

  electron.screen.on('display-added', function () {
    displaysProvider.triggerUpdate();
  });
  // ISSUE: display-removed does not fire, maybe use focus?
  // https://github.com/atom/electron/issues/3075
  electron.screen.on('display-removed', function () {
    displaysProvider.triggerUpdate();
  });
  // ISSUE: display-metrics-changed does not fire, maybe use focus?
  // https://github.com/atom/electron/issues/3075
  electron.screen.on('display-metrics-changed', function () {
    displaysProvider.triggerUpdate();
  });

  // Work with actions

  // TODO: decide if API is required, maybe just gather all major instances
  api = new Api(dashboardWindow, settingsWindow, screen, settings, cache);

  tray = new Tray();

  tray.on('action', function (actionName) {
    switch (actionName) {
      case 'capture-desktop':
        api.captureDesktop();
        break;
      case 'capture-selection':
        api.captureSelection();
        break;
      case 'open-dashboard':
        api.openWindow();
        break;
      case 'open-settings':
        api.openSettings();
        break;
    }
  });

  // Menu actions, TODO: combine with window actions
  dashboardWindow.on('action', function (actionName) {
    switch (actionName) {
      case 'capture-desktop':
        api.captureDesktop();
        break;
      case 'capture-selection':
        api.captureSelection();
        break;
      case 'open-settings':
        api.openSettings();
        break;
    }
  });

  // Other shit

  electron.ipcMain.on('snapshot-requested', function (event, options) {
    if (options.type === 'desktop') {
      api.captureDesktop(options.displayId);
    } else if (options.type === 'selection') {
      api.captureSelection(options.displayId);
    } else if (options.type === 'window') {
      api.captureWindow(options.windowId);
    }
  });

  electron.ipcMain.on('settings-changed', function (event, data) {
    settings.set(data.key, data.value);
  });

  electron.ipcMain.on('settings-dialog', function (event) {
    electron.dialog.showOpenDialog({
      defaultPath: settings.get('save_dir'),
      properties: ['openDirectory', 'createDirectory']
    }, function (directories) {
      if (_.isUndefined(directories)) {
        // "Cancel" pressed
        return;
      }
      var directory = directories[0];
      settings.set('save_dir', directory);
      event.sender.send('settings-updated', settings.get());
    });
  });

  electron.ipcMain.on('upload-requested', function (event, data) {

    var Uploader;

    if (data.uploaderId) {
      Uploader = uploaders[data.uploaderId];
    } else {
      var defaultUploader = settings.get('default_uploader');
      if (defaultUploader) {
        Uploader = uploaders[defaultUploader];
      } else {
        Uploader = uploaders.getDefault();
      }
    }

    var uploader = new Uploader(cache);

    uploader.upload(data.filePath, function (err, link) {
      if (err) throw err;

      electron.clipboard.writeText(link);

      console.log('Uploaded');
      console.log(link);

    });

  });

  electron.ipcMain.on('copy-requested', function (event, data) {

    var copyId = data.copyId || 'image';

    if (copyId === 'image') {

      fs.readFile(data.filePath, function (err, buffer) {
        if (err) throw err;

        var image = electron.nativeImage.createFromBuffer(buffer);
        electron.clipboard.writeImage(image);
      });

    } else if (copyId === 'fileName') {

      var fileName = path.basename(data.filePath);
      electron.clipboard.writeText(fileName);

    } else if (copyId === 'filePath') {

      electron.clipboard.writeText(data.filePath);

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
