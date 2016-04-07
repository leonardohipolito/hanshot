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
  var self = this;

  this.window = new electron.BrowserWindow({
    show: action.capture === false
  });

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
                self.emit('action', 'capture-desktop');
              }
            },
            {
              label: 'Selection',
              click: function () {
                self.emit('action', 'capture-selection');
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Import from clipboard',
              click: function () {
                self.emit('action', 'import-clipboard');
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
            self.emit('action', 'import-open');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          role: 'close'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Settings',
          click: function () {
            self.emit('action', 'open-settings');
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
