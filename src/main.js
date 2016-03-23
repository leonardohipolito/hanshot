'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');
var imgur = require('imgur');
var _ = require('lodash');

var Dashboard = require('./dashboard');
var Screen = require('./screen');
var Settings = require('./settings');
var Cache = require('./cache');
var Api = require('./api');
var Tray = require('./tray');

var cli = require('./cli');

var app = electron.app;
var globalShortcut = electron.globalShortcut;
var ipcMain = electron.ipcMain;
var clipboard = electron.clipboard;

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

  var dashboard = new Dashboard(action);
  var screen = new Screen();
  var settings = new Settings();

  var cache = new Cache();

  // TODO: decide if API is required, maybe just gather all major instances
  api = new Api(dashboard, screen, settings, cache);

  tray = new Tray(api);

  dashboard.window.on('closed', function () {
    screen.destroy();
    cache.save();
  });

  ipcMain.on('snapshot-initiated', function (event, options) {
    if (options.type === 'desktop') {
      api.captureDesktop(options.displayId);
    } else if (options.type === 'selection') {
      api.captureSelection(options.displayId);
    } else if (options.type === 'window') {
      api.captureWindow(options.windowId);
    }
  });

  ipcMain.on('displays-requested', function (event) {
    var displays = screen.getDisplayNames();
    event.sender.send('displays-updated', displays);
  });

  ipcMain.on('windows-requested', function (event) {
    screen.getWindowNames(function (err, names) {
      if (err) throw err;
      event.sender.send('windows-updated', names);
    });
  });

  ipcMain.on('settings-requested', function (event) {
    event.sender.send('settings-updated', settings.get());
  });

  ipcMain.on('settings-changed', function (event, data) {
    settings.set(data.key, data.value);
  });

  ipcMain.on('settings-dialog', function (event) {
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

  ipcMain.on('recent-requested', function (event) {
    var recent = cache.get('recent', []);

    recent = recent.map(function (filePath) {
      return {
        filePath : filePath,
        fileName: path.basename(filePath)
      };
    });

    event.sender.send('recent-updated', recent);
  });

  ipcMain.on('image-requested', function (event, data) {
    fs.readFile(data.filePath, function (err, buffer) {
      var exists = true;
      if (err) {
        if(err.code === 'ENOENT') {
          exists = false;
        } else {
          throw err;
        }
      }

      var image = electron.nativeImage.createFromBuffer(buffer);

      event.sender.send('image-updated', {
        exists: exists,
        filePath: data.filePath,
        fileName: path.basename(data.filePath),
        dataURL: image.toDataURL()
      });

    });
  });

  ipcMain.on('snapshot-upload', function (event, params) {

    imgur.uploadFile('tmp.png')
    .then(function (json) {
      var link = json.data.link;
      clipboard.writeText(link);
      console.log('Uploaded');
    })
    .catch(function (err) {
      console.log(err);
    });

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
  // var isNowRegistered = globalShortcut.register('ctrl+p', function () {
  //   snapshot();
  // });

  // if (!isNowRegistered) {
  //   console.log('registration failed');
  // }

});
