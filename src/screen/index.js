'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Screen() {
  this.window = new BrowserWindow({
    show: false,
    transparent: true,
    frame: false,
    fullscreen: true
  });

  this.window.loadURL('file://' + __dirname + '/renderer/screen.html');
  // this.window.webContents.openDevTools();
}

Screen.prototype.destroy = function () {
  this.window.destroy();
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

Screen.prototype.getDisplayNames = function() {
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

  return null;
};

Screen.prototype.getWindowNames = function (cb) {
  ipcMain.once('windows-loaded', function (event, names) {
    cb(null, names);
  });
  this.window.webContents.send('windows-requested');
};

Screen.prototype.captureDesktop = function (displayId, cb) {

  var overallBounds = this.getOverallBounds();
  var displayBounds = Object.assign({}, overallBounds);

  var display = displayId && this.getDisplayById(displayId);
  if (display) {
    Object.assign(displayBounds, display.bounds);
    this.window.setPosition(displayBounds.x, displayBounds.y);
  }

  ipcMain.once('capture', function (event, data) {
    this.window.hide();

    // TODO: handle cancel
    if (data.action === 'cancel') {

    } else if (data.action === 'complete') {
      cb(null, data);
    }

  }.bind(this));

  if (this.window.webContents.isLoading()) {

    this.window.webContents.on('did-finish-load', function () {

      this.window.webContents.send('snapshot-window-hidden', {
        type: 'desktop',
        overallBounds: overallBounds,
        displayBounds: displayBounds
      });

    }.bind(this));

  } else {

    this.window.webContents.send('snapshot-window-hidden', {
      type: 'desktop',
      overallBounds: overallBounds,
      displayBounds: displayBounds
    });

  }

};

Screen.prototype.captureSelection = function (displayId, cb) {

  var overallBounds = this.getOverallBounds();
  var displayBounds = Object.assign({}, overallBounds);

  var display = displayId && this.getDisplayById(displayId);
  if (!display) {
    var cursorPoint = electron.screen.getCursorScreenPoint();
    display = electron.screen.getDisplayNearestPoint(cursorPoint);
  }

  Object.assign(displayBounds, display.bounds);
  this.window.setPosition(displayBounds.x, displayBounds.y);

  ipcMain.once('capture', function (event, data) {
    this.window.hide();

    // TODO: handle cancel
    if (data.action === 'cancel') {

    } else if (data.action === 'complete') {
      cb(null, data);
    }

  }.bind(this));


  if (this.window.webContents.isLoading()) {

    this.window.webContents.on('did-finish-load', function () {

      this.window.show();

      this.window.webContents.send('snapshot-window-hidden', {
        type: 'selection',
        overallBounds: overallBounds,
        displayBounds: displayBounds
      });

    }.bind(this));

  } else {

    this.window.show();

    this.window.webContents.send('snapshot-window-hidden', {
      type: 'selection',
      overallBounds: overallBounds,
      displayBounds: displayBounds
    });

  }

};

Screen.prototype.captureWindow = function (windowId, cb) {

  var overallBounds = this.getOverallBounds();
  var displayBounds = Object.assign({}, overallBounds);

  ipcMain.once('capture', function (event, data) {
    this.window.hide();

    // TODO: handle cancel
    if (data.action === 'cancel') {

    } else if (data.action === 'complete') {
      cb(null, data);
    }

  }.bind(this));

  if (this.window.webContents.isLoading()) {

    this.window.webContents.on('did-finish-load', function () {

      this.window.webContents.send('snapshot-window-hidden', {
        type: 'window',
        windowId: windowId,
        overallBounds: overallBounds,
        displayBounds: displayBounds
      });

    }.bind(this));

  } else {

    this.window.webContents.send('snapshot-window-hidden', {
      type: 'window',
      windowId: windowId,
      overallBounds: overallBounds,
      displayBounds: displayBounds
    });

  }

};

module.exports = Screen;
