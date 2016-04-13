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

function SettingsWindow() {
  EventEmitter.call(this);

  var self = this;

  this.state = {};
  this.window = null;

  this.onReady = function () {
    self.emit('ready');
  };
  this.onAction = function (event, action) {
    self.emit('action', action);
  };
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
        },
        {
          label: 'Reload',
          click: function () {
            self.window.reload();
          }
        }
      ]
    }
  ];

  var menu = electron.Menu.buildFromTemplate(template);

  this.window.setMenu(menu);

  electron.ipcMain.on('settings-ready', this.onReady);
  electron.ipcMain.on('settings-action', this.onAction);

  // this.window.webContents.openDevTools();
};

SettingsWindow.prototype.close = function () {
  if (!this.window) {
    return;
  }
  this.state = {};
  this.window.destroy();
  this.window = null;
  electron.ipcMain.removeListener('settings-ready', this.onReady);
  electron.ipcMain.removeListener('settings-action', this.onAction);
};

SettingsWindow.prototype.sendState = function (state) {
  if (!this.window) {
    return;
  }
  this.window.webContents.send('settings-state-updated', state);
};

module.exports = SettingsWindow;
