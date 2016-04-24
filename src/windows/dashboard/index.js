'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var electron = require('electron');

var menuFactory = require('../../factories/menu');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function DashboardWindow() {
  EventEmitter.call(this);

  var self = this;

  this.state = {};
  this.window = null;

  var template = menuFactory.dashboard(function dispatch(action) {
    self.emit('action', action);
  });
  this.menu = electron.Menu.buildFromTemplate(template);

  this.onReady = function () {
    self.emit('ready');
  };
  this.onAction = function (event, action) {
    self.emit('action', action);
  }
}

util.inherits(DashboardWindow, EventEmitter);

DashboardWindow.prototype.open = function () {
  if (this.window) {
    this.window.show();
    return;
  }

  var self = this;

  this.window = new electron.BrowserWindow({
    show: false
  });

  this.window.loadURL('file://' + __dirname + '/renderer/dashboard.html');

  this.window.on('closed', function () {
    self.close();
    self.emit('close');
  });

  this.window.on('focus', function () {
    self.emit('focus');
  });

  this.window.setMenu(this.menu);

  electron.ipcMain.on('dashboard-ready', this.onReady);
  electron.ipcMain.on('dashboard-action', this.onAction);

  // this.window.webContents.openDevTools();
};

DashboardWindow.prototype.close = function () {
  if (!this.window) {
    return;
  }
  this.state = {};
  this.window.destroy();
  this.window = null;
  electron.ipcMain.removeListener('dashboard-ready', this.onReady);
  electron.ipcMain.removeListener('dashboard-action', this.onAction);
};

DashboardWindow.prototype.sendState = function (state) {
  if (!this.window) {
    return;
  }
  this.window.webContents.send('dashboard-state-updated', state);
};

DashboardWindow.prototype.show = function () {
  if (!this.window) {
    return;
  }
  this.window.show();
};

DashboardWindow.prototype.hide = function () {
  if (!this.window) {
    return;
  }
  this.window.hide();
};

module.exports = DashboardWindow;
