'use strict';

const electron = require('electron');
const fs = require('fs');

const app = electron.app;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;
const nativeImage = electron.nativeImage;
const BrowserWindow = electron.BrowserWindow;


var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  // "printscreen" is not supported yet. FUCK
  // https://github.com/atom/electron/issues/4663
  var isNowRegistered = globalShortcut.register('ctrl+p', function () {
    snapshot();
  });

  if (!isNowRegistered) {
    console.log('registration failed');
  }

});

function snapshot() {

  mainWindow = new BrowserWindow({
    show: false
  });

  ipcMain.once('snapshot', onSnapshot);

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

}

function onSnapshot(event, dataURL) {

  var image = nativeImage.createFromDataURL(dataURL);
  var buf = image.toPng();

  fs.writeFile('tmp.png', buf, function (err) {
    if (err) throw err;

    console.log('Shot');
  });
}