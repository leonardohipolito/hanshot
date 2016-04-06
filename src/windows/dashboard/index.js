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

function DashboardWindow() {
  EventEmitter.call(this);

  this.state = {};
  this.window = null;

  this.onReady = this.onReady.bind(this);
}

util.inherits(DashboardWindow, EventEmitter);

// TODO: rethink actions
DashboardWindow.prototype.open = function (action) {
  this.window = new electron.BrowserWindow({
    show: action.capture === false
  });

  this.window.loadURL('file://' + __dirname + '/renderer/dashboard.html');

  this.window.on('closed', function () {
    this.close();
    this.emit('close');
  }.bind(this));

  this.window.on('focus', function () {
    this.emit('focus');
  }.bind(this));

  electron.ipcMain.on('dashboard-ready', this.onReady);

  // this.window.webContents.openDevTools();
};

DashboardWindow.prototype.onReady = function () {
  this.emit('ready');
};

DashboardWindow.prototype.close = function () {
  if (!this.window) {
    return;
  }
  this.state = {};
  this.window.destroy();
  this.window = null;
  electron.ipcMain.removeListener('dashboard-ready', this.onReady);
};

DashboardWindow.prototype.updateState = function (newState) {
  if (!_.isUndefined(newState)) {
    _.merge(this.state, newState);
  }
  this.window.webContents.send('dashboard-state-updated', this.state);
};

DashboardWindow.prototype.show = function () {
  this.window.show();
};

DashboardWindow.prototype.hide = function () {
  this.window.hide();
};

module.exports = DashboardWindow;
