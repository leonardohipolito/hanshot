'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');

var electron = require('electron');
var imgur = require('imgur');

var Jimp = require('./lib/jimp-extended');

var Screen = require('./screen');


var app = electron.app;
var globalShortcut = electron.globalShortcut;
var ipcMain = electron.ipcMain;
var nativeImage = electron.nativeImage;
var BrowserWindow = electron.BrowserWindow;
var clipboard = electron.clipboard;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var isLinux = (process.platform === 'linux');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

if (isLinux) {
  // http://electron.atom.io/docs/v0.36.8/api/frameless-window/#limitations
  // Alpha channel doesn’t work on some NVidia drivers on Linux
  app.commandLine.appendSwitch('enable-transparent-visuals');
  app.commandLine.appendSwitch('disable-gpu');
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  var screen = new Screen();

  var userWindow = new BrowserWindow();
  userWindow.loadURL('file://' + __dirname + '/renderers/user/index.html');
  userWindow.webContents.openDevTools();
  userWindow.maximize();
  userWindow.on('closed', function () {
    screen.destroy();
  });

  // TODO: tray

  function writeTmp(data) {
    var image = nativeImage.createFromDataURL(data.dataURL);
    var buf = image.toPng();

    Jimp.read(buf, function (err, image) {

      if (data.autocrop) {
        image.autocropRightBottomAlpha();
      }

      image.write('tmp.png');
      console.error('Shot');

    });
  }

  ipcMain.on('snapshot-initiated', function (event, options) {

    if (options.type === 'desktop') {

      screen.captureDesktop(options.displayId, function (err, snapshot) {
        if (err) throw err;
        writeTmp(snapshot);
      });

    } else if (options.type === 'selection') {

      screen.captureSelection(options.displayId, function (err, snapshot) {
        if (err) throw err;
        writeTmp(snapshot);
      });

    } else if (options.type === 'window') {

      screen.captureWindow(options.windowId, function (err, snapshot) {
        if (err) throw err;
        writeTmp(snapshot);
      });

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

  // "printscreen" is not supported yet. FUCK
  // https://github.com/atom/electron/issues/4663
  // var isNowRegistered = globalShortcut.register('ctrl+p', function () {
  //   snapshot();
  // });

  // if (!isNowRegistered) {
  //   console.log('registration failed');
  // }

});
