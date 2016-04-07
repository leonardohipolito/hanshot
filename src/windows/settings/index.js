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
  if (this.window) {
    this.window.show();
    return;
  }

  var self = this;

  this.window = new electron.BrowserWindow();

  this.window.loadURL('file://' + __dirname + '/renderer/settings.html');

  this.window.on('closed', function () {
    self.close();
    self.emit('close');
  });

  var template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Close',
          role: 'close'
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Open dev tools',
          click: function () {
            self.window.webContents.openDevTools();
          }
        }
      ]
    }
  ];

  var menu = electron.Menu.buildFromTemplate(template);

  this.window.setMenu(menu);

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
  if (!this.window) {
    return;
  }
  if (!_.isUndefined(newState)) {
    _.merge(this.state, newState);
  }
  if (this.window) {
    this.window.webContents.send('settings-state-updated', this.state);
  }
};

module.exports = SettingsWindow;
