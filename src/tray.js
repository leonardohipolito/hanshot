'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

var tray = null;

exports.init = function (api) {

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

  tray = new electron.Tray(iconPath);
  tray.setContextMenu(menu);
}
