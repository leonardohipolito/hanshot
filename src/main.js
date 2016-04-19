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
var Tray = require('./tray');
var Dispatcher = require('./dispatcher');
var Gallery = require('./image/gallery');

var windows = {
  Dashboard: require('./windows/dashboard'),
  Settings: require('./windows/settings'),
  Selection: require('./windows/selection')
};

var createApi = require('./api');
var createStore = require('./store');
var storeActions = require('./store/actions');
var metadata = require('./config/metadata');

var notify = require('./notification');

var factory = {
  alert: require('./factory/alert'),
  dialog: require('./factory/dialog')
};

var cli = require('./cli');

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
var shouldQuit = electron.app.makeSingleInstance(function (argv, workdir) {
  console.log('There is an already running instance');
  var args = argv.slice(2);

  if (!api) {
    console.log('Unable to use already running instance');
    return;
  }

  if (!args.length) {
    api.window.openDashboard();
    return;
  }

  var action = cli.parseAction(args);
  if (action.capture === 'desktop') {
    api.capture.desktop();
  } else if (action.capture === 'selection') {
    api.capture.selection();
  } else if (action.capture === 'window') {
    api.capture.window();
  }
});

if (shouldQuit) {
  electron.app.quit();
  return;
}

// ---

process.on('uncaughtException', function (err) {
  electron.dialog.showErrorBox(
    'Uncaught exception, app will now quit',
    err.stack
  );
  console.log('Uncaught exception: ', err);
  console.log(err.stack);
  electron.app.quit();
});

// ---

if (isLinux) {
  // http://electron.atom.io/docs/v0.36.8/api/frameless-window/#limitations
  // Alpha channel doesn’t work on some NVidia drivers on Linux
  electron.app.commandLine.appendSwitch('enable-transparent-visuals');
  electron.app.commandLine.appendSwitch('disable-gpu');
}

// ---

electron.app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    electron.app.quit();
  }
});

electron.app.on('ready', function () {

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

  var fetchImage = function () {
    return storeActions.receiveImage(gallery.last());
  };

  var fetchMetadata = function () {
    return storeActions.receiveMetadata(metadata);
  };

  // Store dispatchers

  store.dispatch(fetchWindows());
  store.dispatch(fetchDisplays());
  store.dispatch(fetchSettings());
  store.dispatch(fetchImage());
  store.dispatch(fetchMetadata());

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
    electron.app.quit();
  };

  if (settings.get('show-on-start')) {
    dashboardWindow.open();
  }
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

  var application = {
    windows: {
      dashboard: dashboardWindow,
      settings: settingsWindow,
      selection: selectionWindow
    },
    settings: settings,
    cache: cache,
    screen: screen,
    gallery: gallery,
    store: store
  };

  // TODO: decide if API is required, maybe just gather all major instances
  api = createApi(application);

  tray = new Tray();

  tray.on('action', dispatcher.dispatch.bind(dispatcher));
  dashboardWindow.on('action', dispatcher.dispatch.bind(dispatcher));
  settingsWindow.on('action', dispatcher.dispatch.bind(dispatcher));

  dispatcher.register(function (action) {
    switch (action.actionName) {
      case 'capture-desktop':
        api.capture.desktop(action.displayId);
        break;
      case 'capture-selection':
        api.capture.selection(action.displayId);
        break;
      case 'capture-window':
        api.capture.window(action.windowId);
        break;
      case 'open-dashboard':
        api.window.openDashboard();
        break;
      case 'open-settings':
        api.window.openSettings();
        break;
      case 'import-clipboard':
        api.file.import();
        break;
      case 'import-open':
        factory.dialog.openImage(function (filePath) {
          api.file.open(filePath);
        });
        break;
      case 'save-as':
        var image = gallery.last();
        if (!image) {
          return;
        }
        factory.dialog.saveImageAs(image.getFileName(), function (filePath) {
          api.file.saveAs(filePath, image);
        });
        break;
      case 'upload':
        api.uploader.upload(action.uploaderId, action.filePath);
        break;

      case 'uploader-auth':
        api.uploader.authorize(action.uploaderId);
        break;

      case 'copy-image':
        api.copy.image(action.filePath);
        break;
      case 'copy-text':
        api.copy.text(action.text);
        break;
      case 'force-quit':
        quitApp();
        break;
      case 'settings-changed':
        settings.set(action.key, action.value);
        store.dispatch( storeActions.updateSetting(action.key, action.value) );
        break;
      case 'settings-dialog':
        var currentDirPath = settings.get('save-dir-path');
        factory.dialog.saveImagesTo(currentDirPath, function (dirPath) {
          settings.set('save-dir-path', dirPath);
          store.dispatch( storeActions.updateSetting('save-dir-path', dirPath) );
        });
        break;
      case 'close-alert':
        store.dispatch( storeActions.closeAlert( action.alertId ) );
        break;
    }
  });

  if (action.capture === 'desktop') {
    api.capture.desktop();
  } else if (action.capture === 'selection') {
    api.capture.selection();
  } else if (action.capture === 'window') {
    api.capture.window();
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
