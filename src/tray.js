'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var electron = require('electron');

var appActions = require('./app/actions');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Tray() {
  EventEmitter.call(this);

  var self = this;

  var iconPath = path.join(__dirname, '..', 'resources', 'tray.png');

  var template = [
    {
      label: 'Open',
      click: function () {
        self.emit('action', appActions.openDashboard());
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Desktop',
      click: function () {
        self.emit('action', appActions.captureDesktop());
      }
    },
    {
      label: 'Selection',
      click: function () {
        self.emit('action', appActions.captureSelection());
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Settings',
      click: function () {
        self.emit('action', appActions.openSettings());
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: function () {
        self.emit('action', appActions.quitApp());
      }
    }
  ];

  var menu = electron.Menu.buildFromTemplate(template);

  this.tray = new electron.Tray(iconPath);
  this.tray.setContextMenu(menu);
}

util.inherits(Tray, EventEmitter);

module.exports = Tray;
