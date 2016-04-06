'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var electron = require('electron');
var _ = require('lodash');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function SettingsWindow() {
  EventEmitter.call(this);

  this.state = {};
  this.window = null;

  this.onReady = this.onReady.bind(this);
};

util.inherits(SettingsWindow, EventEmitter);

SettingsWindow.prototype.open = function () {
  this.window = new electron.BrowserWindow();

  this.window.loadURL('file://' + __dirname + '/renderer/settings.html');

  this.window.on('closed', function () {
    this.close();
    this.emit('close');
  }.bind(this));

  // Remove window menu
  // TODO: mac
  this.window.setMenu(null);

  electron.ipcMain.on('settings-ready', this.onReady);

  // this.window.webContents.openDevTools();
};

SettingsWindow.prototype.onReady = function () {
  this.emit('ready');
};

SettingsWindow.prototype.close = function () {
  if (!this.window) {
    return;
  }
  this.state = {};
  this.window.destroy();
  this.window = null;
  electron.ipcMain.removeListener('settings-ready', this.onReady);
};

SettingsWindow.prototype.updateState = function (newState) {
  if (!_.isUndefined(newState)) {
    _.merge(this.state, newState);
  }
  if (this.window) {
    this.window.webContents.send('settings-state-updated', this.state);
  }
};

module.exports = SettingsWindow;
