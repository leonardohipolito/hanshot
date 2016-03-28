'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');
var _ = require('lodash');

var Dashboard = require('./dashboard');
var Screen = require('./screen');
var Settings = require('./settings');
var Cache = require('./cache');
var Api = require('./api');
var Tray = require('./tray');

var cli = require('./cli');
var uploaders = require('./uploaders');

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

  ipcMain.on('image-requested', function (event, data) {
    var recent = cache.get('recent', []);
    if (!recent.length) {
      event.sender.send('image-updated', {});
      return;
    }

    var filePath = recent[0];

    fs.readFile(filePath, function (err, buffer) {
      if (err) {
        if (err.code === 'ENOENT') {
          event.sender.send('image-updated', {});
          return;
        } else {
          throw err;
        }
      }

      var image = electron.nativeImage.createFromBuffer(buffer);
      var imageSize = image.getSize();

      event.sender.send('image-updated', {
        filePath: filePath,
        fileName: path.basename(filePath),
        dataURL: image.toDataURL(),
        width: imageSize.width,
        height: imageSize.height
      });

    });
  });

  ipcMain.on('upload-requested', function (event, data) {

    if (data.uploader === 'imgur') {

      var imgur = new uploaders.Imgur(cache);

      imgur.upload(data.filePath, function (err, link) {
        if (err) throw err;

        clipboard.writeText(link);

        console.log('Uploaded');
        console.log(link);

      });

    } else if (data.uploader === 'dropbox') {

      var dropbox = new uploaders.Dropbox(cache);

      dropbox.upload(data.filePath, function (err, link) {
        if (err) throw err;

        clipboard.writeText(link);

        console.log('Uploaded');
        console.log(link);

      });

    }

  });

  ipcMain.on('copy-requested', function (event, data) {

    if (data.type === 'image') {

      fs.readFile(data.filePath, function (err, buffer) {
        if (err) throw err;

        var image = electron.nativeImage.createFromBuffer(buffer);
        clipboard.writeImage(image);
      });

    } else if (data.type === 'fileName') {

      var fileName = path.basename(data.filePath);
      clipboard.writeText(fileName);

    } else if (data.type === 'filePath') {

      clipboard.writeText(data.filePath);

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
  // var isNowRegistered = globalShortcut.register('ctrl+p', function () {
  //   snapshot();
  // });

  // if (!isNowRegistered) {
  //   console.log('registration failed');
  // }

});
