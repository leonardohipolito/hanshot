'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');

var electron = require('electron');

var imgur = require('imgur');

var Screen = require('./screen');
var Api = require('./api');
var cli = require('./cli');

var app = electron.app;
var globalShortcut = electron.globalShortcut;
var ipcMain = electron.ipcMain;
var BrowserWindow = electron.BrowserWindow;
var clipboard = electron.clipboard;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var isLinux = (process.platform === 'linux');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var api = null;

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

  var screen = new Screen();

  var userWindow = new BrowserWindow({
    show: action.capture === false
  });
  userWindow.loadURL('file://' + __dirname + '/renderers/user/index.html');
  userWindow.webContents.openDevTools();
  userWindow.on('closed', function () {
    screen.destroy();
  });

  api = new Api(screen, userWindow);

  // TODO: tray

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
