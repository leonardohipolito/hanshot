'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Tray(api) {

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
      label: 'Settings',
      click: function () {
        api.openSettings();
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

  var menu = electron.Menu.buildFromTemplate(template);

  this.tray = new electron.Tray(iconPath);
  this.tray.setContextMenu(menu);

}

module.exports = Tray;
