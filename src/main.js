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
var Dispatcher = require('./dispatcher');
var Gallery = require('./image/gallery');

var windows = {
  Dashboard: require('./windows/dashboard'),
  Settings: require('./windows/settings'),
  Selection: require('./windows/selection')
};

var createStore = require('./store');
var storeActions = require('./store/actions');
var alerts = require('./config/alerts');

var cli = require('./cli');
var uploaders = require('./uploaders');

var app = electron.app;

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
  var gallery = new Gallery(cache.get('gallery', []));

  // Create store

  var store = createStore();

  store.subscribe(function () {
    dashboardWindow.sendState(store.getState());
    settingsWindow.sendState(store.getState());
  });

  // Dependent store actions

  var fetchDisplays = function () {
    return storeActions.receiveDisplays(screen.getDisplayList());
  };

  var fetchWindows = function () {
    return function (dispatch) {
      screen.getWindowList(function (err, windows) {
        dispatch(storeActions.receiveWindows(windows));
      });
    };
  };

  var fetchSettings = function () {
    return storeActions.receiveSettings(settings.serialize());
  };

  var fetchUploaders = function () {
    var uploadersList = uploaders.getList();

    var defaultUploader = settings.get('default-uploader');
    if (defaultUploader) {
      uploadersList.forEach(function (uploader) {
        uploader.isDefault = defaultUploader === uploader.id;
      });
    }

    return storeActions.receiveUploaders(uploadersList);
  };

  var fetchImage = function () {
    return storeActions.receiveImage(gallery.last());
  };

  // Store dispatchers

  store.dispatch(fetchWindows());
  store.dispatch(fetchDisplays());
  store.dispatch(fetchSettings());
  store.dispatch(fetchUploaders());
  store.dispatch(fetchImage());

  gallery.on('added', function () {
    store.dispatch(fetchImage());
  });
  gallery.on('updated', function (filePath) {
    if (store.getState().image.filePath === filePath) {
      store.dispatch(fetchImage());
    }
  });

  screen.on('display-added', function () {
    store.dispatch(fetchDisplays());
  });

  screen.on('display-removed', function () {
    store.dispatch(fetchDisplays());
  });

  screen.on('display-updated', function () {
    store.dispatch(fetchDisplays());
  });

  // Create windows

  var quitApp = function () {
    cache.set('gallery', gallery.serialize());

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

  dashboardWindow.on('ready', function () {
    dashboardWindow.sendState(store.getState());
  });

  dashboardWindow.on('focus', function () {
    store.dispatch(fetchWindows());
  });

  settingsWindow.on('close', function () {
    settings.save();
  });

  settingsWindow.on('ready', function (event) {
    settingsWindow.sendState(store.getState());
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

        if (!uploader.isAuthorized()) {
          store.dispatch(storeActions.showAlert(
            alerts.uploaderAuth(uploader.id, uploader.name)
          ));
          dashboardWindow.open();
          return;
        }

        var buffer = null;
        if (settings.get('image-format') === 'jpg') {
          buffer = image.toJpgBuffer(settings.get('jpg-quality'));
        } else {
          buffer = image.toPngBuffer();
        }

        uploader.upload(image.getFileName(), buffer, function (err, link) {
          if (err) throw err;

          electron.clipboard.writeText(link);

          gallery.addPublicUrl(image.getFilePath(), link);

          console.log('Uploaded');
          console.log(link);

        });
        break;

      case 'uploader-auth':

        var Uploader = uploaders[action.uploaderId];
        if (!Uploader) {
          return;
        }

        var uploader = new Uploader(cache);
        if (uploader.isAuthorized()) {
          return;
        }

        uploader.authorize();

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
      case 'copy-text':
        electron.clipboard.writeText(action.text);
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
      case 'close-alert':
        store.dispatch( storeActions.closeAlert( action.alertId ) );
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
