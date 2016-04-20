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

  // Window can't be "show: false" and "fullscreen: true" at the same time,
  // two modes are considered conflicting.
  // https://github.com/electron/electron/issues/3228
  this.window = new electron.BrowserWindow({
    show: false,
    frame: false,
    // Setting zero width and height to not to have weird flickers
    // when window tries to transition to a fullscreen mode. Otherwise, it
    // will show original window for a second, and then fullscreened one.
    width: 0,
    height: 0,
    // Transparency allows to hide white flickering background
    // when transitioning to fullscreen
    transparent: true
  });

  // Send image when window is ready
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
      self.window.setFullScreen(true);
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
