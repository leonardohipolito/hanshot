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

  var self = this;

  this.state = {};
  this.window = null;

  this.onReady = function () {
    self.emit('ready');
  };
  this.onAction = function (event, action) {
    self.emit('action', action);
  }
}

util.inherits(DashboardWindow, EventEmitter);

// TODO: rethink actions
DashboardWindow.prototype.open = function () {
  if (this.window) {
    this.window.show();
    return;
  }

  var self = this;

  this.window = new electron.BrowserWindow();

  this.window.loadURL('file://' + __dirname + '/renderer/dashboard.html');

  this.window.on('closed', function () {
    self.close();
    self.emit('close');
  });

  this.window.on('focus', function () {
    self.emit('focus');
  });

  var template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          submenu: [
            {
              label: 'Desktop',
              click: function () {
                self.emit('action', { actionName: 'capture-desktop' });
              }
            },
            {
              label: 'Selection',
              click: function () {
                self.emit('action', { actionName: 'capture-selection' });
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Import from clipboard',
              click: function () {
                self.emit('action', { actionName: 'import-clipboard' });
              }
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: 'Open...',
          click: function () {
            self.emit('action', { actionName: 'import-open' });
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save as...',
          click: function () {
            self.emit('action', { actionName: 'save-as' });
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          click: function () {
            self.emit('action', { actionName: 'force-quit' });
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Settings',
          click: function () {
            self.emit('action', { actionName: 'open-settings' });
          }
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

DashboardWindow.prototype.updateState = function (newState) {
  if (!this.window) {
    return;
  }
  if (!_.isUndefined(newState)) {
    _.merge(this.state, newState);
  }
  this.window.webContents.send('dashboard-state-updated', this.state);
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
