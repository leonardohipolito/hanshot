'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function SelectionWindow() {
  EventEmitter.call(this);

  this.window = null;
}

util.inherits(SelectionWindow, EventEmitter);

SelectionWindow.prototype.open = function (options, callback) {
  var self = this;

  if (this.window) {
    return;
  }

  this.window = new electron.BrowserWindow({
    show: false,
    fullscreen: true,
    frame: false
  });

  // this.window.webContents.openDevTools();

  this.window.webContents.once('did-finish-load', function () {
    electron.ipcMain.once('selection-complete', function (event, err, dataURL) {
      if (err) {
        callback(err);
        self.close();
      } else {
        callback(null, dataURL);
        self.close();
      }
    });
    electron.ipcMain.once('selection-ready', function () {
      self.window.show();
    });
    self.window.webContents.send('selection-image', {
      dataURL: options.dataURL,
      displayBounds: options.displayBounds
    });
  });

  this.window.loadURL('file://' + __dirname + '/renderer/selection.html');

  this.window.on('closed', function () {
    callback(new Error('canceled'));
    self.close();
  });
};

SelectionWindow.prototype.close = function () {
  if (!this.window) {
    return;
  }
  this.window.destroy();
  this.window = null;
};

module.exports = SelectionWindow;
