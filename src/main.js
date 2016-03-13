'use strict';

const fs = require('fs');

const electron = require('electron');
const imgur = require('imgur');

const Jimp = require('./lib/jimp-extended');
const screens = require('./shared/screens');


const app = electron.app;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;
const nativeImage = electron.nativeImage;
const BrowserWindow = electron.BrowserWindow;
const clipboard = electron.clipboard;


var isLinux = (process.platform === 'linux');

var userWindow = null;
var captureWindow = null;

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

  var overallBounds = screens.getOverallBounds();

  userWindow = new BrowserWindow({
    // show: false
  });
  userWindow.loadURL('file://' + __dirname + '/renderers/user/index.html');
  userWindow.webContents.openDevTools();
  userWindow.maximize();
  userWindow.on('closed', function () {
    if (captureWindow) {
      captureWindow.close();
    }
    userWindow = null;
  });

  captureWindow = new BrowserWindow({
    show: false,
    transparent: true,
    frame: false,
    fullscreen: true
  });

  captureWindow.loadURL('file://' + __dirname + '/renderers/capture/capture.html');
  // captureWindow.webContents.openDevTools();
  captureWindow.on('closed', function () {
    captureWindow = null;
  });

  ipcMain.on('snapshot-initiated', function (event, options) {
    userWindow.hide();

    var displayBounds = Object.assign({}, overallBounds);

    if (options.displayId) {
      var display = screens.getDisplayById(options.displayId);
      if (display) {
        Object.assign(displayBounds, display.bounds);
        captureWindow.setPosition(displayBounds.x, displayBounds.y);
      }
    }

    if (options.type === 'selection') {

      if (!options.displayId) {
        var mousePos = electron.screen.getCursorScreenPoint();
        var display = electron.screen.getDisplayNearestPoint(mousePos);
        Object.assign(displayBounds, display.bounds);
        captureWindow.setPosition(displayBounds.x, displayBounds.y);
      }

      captureWindow.show();
    }

    setTimeout(function () {
      captureWindow.webContents.send('snapshot-window-hidden', {
        windowId: options.windowId,
        type: options.type,
        overallBounds: overallBounds,
        displayBounds: displayBounds
      });
    }, 100);
  });

  ipcMain.on('snapshot-cancelled', function (event, data) {
    captureWindow.hide();
    userWindow.show();
  });

  ipcMain.on('snapshot-shot', function (event, data) {

    captureWindow.hide();
    userWindow.show();

    var image = nativeImage.createFromDataURL(data.dataURL);
    var buf = image.toPng();

    Jimp.read(buf, function (err, image) {

      if (data.autocrop) {
        image.autocropRightBottomAlpha();
      }

      image.write('tmp.png');
      console.error('Shot');

    });

  });

  ipcMain.on('displays-requested', function () {
    var displays = screens.getNames();
    userWindow.webContents.send('displays-updated', displays);
  });

  ipcMain.on('windows-requested', function () {
    captureWindow.webContents.send('windows-requested');
  });
  ipcMain.on('windows-loaded', function (event, windows) {
    userWindow.webContents.send('windows-updated', windows);
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
