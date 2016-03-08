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

  var bounds = screens.getOverallBounds();

  userWindow = new BrowserWindow({
    // show: false
  });
  userWindow.loadURL('file://' + __dirname + '/renderers/user/user.html');
  // userWindow.webContents.openDevTools();
  userWindow.on('closed', function () {
    if (captureWindow) {
      captureWindow.close();
    }
    userWindow = null;
  });

  console.log(bounds);

  captureWindow = new BrowserWindow({
    show: false,
    frame: false,
    transparent: true,
    enableLargerThanScreen: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    // fullscreenable: false,
    // kiosk: true,
    // skipTaskbar: true,
    // alwaysOnTop: true,
    hasShadow: false,
    minWidth: bounds.width,
    minHeight: bounds.height,
    x: 0,
    y: 0
  });

  captureWindow.setPosition(0, -76);

  console.log(captureWindow.getPosition());
  console.log(captureWindow.getBounds());

  captureWindow.loadURL('file://' + __dirname + '/renderers/capture/capture.html');
  // captureWindow.webContents.openDevTools();
  captureWindow.on('closed', function () {
    captureWindow = null;
  });

  ipcMain.on('snapshot-initiated', function (event, options) {
    userWindow.hide();

    if (options.type === 'selection') {
      captureWindow.show();
    }

    setTimeout(function () {
      captureWindow.webContents.send('snapshot-window-hidden', {
        windowId: options.windowId,
        type: options.type,
        bounds: bounds
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

    if (data.autocrop) {

      Jimp.read(buf, function (err, image) {
        if (err) throw err;

        image.autocropRightBottomAlpha();
        image.write('tmp.png');
      });

    } else {
      fs.writeFile('tmp.png', buf, function (err) {
        if (err) throw err;

        console.log('Shot');
      });
    }

  });

  ipcMain.on('load-windows-initiated', function (event) {
    captureWindow.webContents.send('load-windows-initiated');
  });

  ipcMain.on('windows-loaded', function (event, data) {
    userWindow.webContents.send('windows-loaded', data);
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
