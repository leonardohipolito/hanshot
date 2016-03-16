'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

var ipcMain = electron.ipcMain;
var Tray = electron.Tray;
var Menu = electron.Menu;

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function SystemTray(api) {

  var iconPath = path.join(__dirname, '..', 'resources', 'tray.png');

  var template = [
    {
      label: 'Open',
      click: function () {
        api.openWindow();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Desktop',
      click: function () {
        api.captureDesktop();
      }
    },
    {
      label: 'Selection',
      click: function () {
        api.captureSelection();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      role: 'close'
    }
  ];

  var menu = Menu.buildFromTemplate(template);

  this.tray = new Tray(iconPath);
  this.tray.setContextMenu(menu);

}

module.exports = SystemTray;
