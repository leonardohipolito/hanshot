'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var electron = require('electron');

import { SOURCE_PATH } from '../config';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Screen() {
  var self = this;

  EventEmitter.call(this);

  this.window = new electron.BrowserWindow({
    show: false
  });

  this.window.loadURL(`file://${SOURCE_PATH}/screen/renderer/screen.html`);
  this.window.webContents.openDevTools();

  electron.screen.on('display-added', function () {
    self.emit('display-added');
  });
  // ISSUE: display-removed does not fire
  // https://github.com/atom/electron/issues/3075
  electron.screen.on('display-removed', function () {
    self.emit('display-removed');
  });
  // ISSUE: display-metrics-changed does not fire
  // https://github.com/atom/electron/issues/3075
  electron.screen.on('display-metrics-changed', function () {
    self.emit('display-updated');
  });
}

util.inherits(Screen, EventEmitter);

Screen.prototype.destroy = function () {
  this.window.destroy();
};

Screen.prototype.callWhenReady = function (fn) {
  var self = this;

  if (this.window.webContents.isLoading()) {
    this.window.webContents.once('did-finish-load', function () {
      fn.call(self);
    });
  } else {
    fn.call(self);
  }
};

Screen.prototype.getOverallBounds = function () {

  var bounds = { x: 0, y: 0, width: 0, height: 0 };

  var displays = electron.screen.getAllDisplays();

  // TODO: handle displays located vertically and/or horizontally
  // now it's only working for all displays located horizontally
  displays.forEach(function (display) {
    bounds.width += display.bounds.width;
    bounds.height = Math.max(bounds.height, display.bounds.height);
  });

  return bounds;
};

Screen.prototype.getActiveDisplay = function () {
  var cursorPoint = electron.screen.getCursorScreenPoint();
  var activeDisplay = electron.screen.getDisplayNearestPoint(cursorPoint);
  return activeDisplay;
};

Screen.prototype.getDisplayList = function() {
  var displays = electron.screen.getAllDisplays();
  var primaryDisplay = electron.screen.getPrimaryDisplay();

  var names = displays.map(function (display) {
    var name = display.bounds.width + 'x' + display.bounds.height;
    if (display.id === primaryDisplay.id) {
      name += ' (primary)';
    }
    return {
      id: display.id,
      name: name
    };
  });

  return names;
};

Screen.prototype.getDisplayById = function (displayId) {
  var displays = electron.screen.getAllDisplays();

  for (var i = 0; i < displays.length; i++) {
    if (displays[i].id === displayId) {
      return displays[i];
    }
  }

  return;
};

Screen.prototype.getWindowList = function (callback) {
  this.callWhenReady(function () {
    electron.ipcMain.once('screen-windows-received', function (event, windows) {
      callback(null, windows);
    });
    this.window.webContents.send('screen-windows-requested');
  });
};

Screen.prototype.captureDisplay = function (displayId, callback) {

  var overallBounds = this.getOverallBounds();
  var displayBounds = Object.assign({}, overallBounds);

  var display = displayId && this.getDisplayById(displayId);
  if (display) {
    Object.assign(displayBounds, display.bounds);
    this.window.setPosition(displayBounds.x, displayBounds.y);
  }

  this.callWhenReady(function () {

    electron.ipcMain.once('screen-capture-display-ready', function (event, err, dataURL) {
      if (err) throw err;

      callback(null, dataURL);
    });

    this.window.webContents.send('screen-capture-display', {
      overallBounds: overallBounds,
      displayBounds: displayBounds
    });
  });
};

Screen.prototype.captureWindow = function (windowId, callback) {

  var overallBounds = this.getOverallBounds();
  var displayBounds = Object.assign({}, overallBounds);

  this.callWhenReady(function () {

    electron.ipcMain.once('screen-capture-window-ready', function (event, err, dataURL) {
      if (err) throw err;

      callback(null, dataURL);
    });

    this.window.webContents.send('screen-capture-window', {
      windowId: windowId,
      overallBounds: overallBounds,
      displayBounds: displayBounds
    });

  });
};

module.exports = Screen;
