'use strict';

const electron = require('electron');
const fs = require('fs');

const app = electron.app;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;
const nativeImage = electron.nativeImage;
const BrowserWindow = electron.BrowserWindow;

var isLinux = (process.platform === 'linux');

var mainWindow = null;
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

  mainWindow = new BrowserWindow();
  mainWindow.loadURL('file://' + __dirname + '/main.html');
  mainWindow.on('closed', function () {
    if (captureWindow) {
      captureWindow.close();
    }
    mainWindow = null;
  });

  captureWindow = new BrowserWindow({
    show: false,
    frame: false,
    fullscreen: true,
    transparent: true
  });
  captureWindow.loadURL('file://' + __dirname + '/capture.html');
  // captureWindow.webContents.openDevTools();
  captureWindow.on('closed', function () {
    captureWindow = null;
  });

  ipcMain.on('snapshot-initiated', function (event, options) {
    mainWindow.hide();

    // if (options.type === 'selection') {
      captureWindow.show();
    // }

    setTimeout(function () {
      captureWindow.webContents.send('snapshot-window-hidden', options);
    }, 100);
  });

  ipcMain.on('snapshot-cancelled', function (event, data) {
    captureWindow.hide();
    mainWindow.show();
  });

  ipcMain.on('snapshot-shot', function (event, data) {

    captureWindow.hide();
    mainWindow.show();

    var image = nativeImage.createFromDataURL(data.dataURL);
    var buf = image.toPng();

    fs.writeFile('tmp.png', buf, function (err) {
      if (err) throw err;

      console.log('Shot');
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
