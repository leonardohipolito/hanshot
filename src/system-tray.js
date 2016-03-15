'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

var api = require('./api');

var ipcMain = electron.ipcMain;
var Tray = electron.Tray;
var Menu = electron.Menu;

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

// Hold instance of tray, do not let it be garbage collected
var tray = null;

function getMenuTemplate() {
  var template = [
    {
      label: 'Open',
      click: function () {
        api.window.open();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Desktop',
      click: function () {
        api.snap.desktop();
      }
    },
    {
      label: 'Selection',
      click: function () {
        api.snap.selection();
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
  return template;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

exports.init = function () {

  var iconPath = path.join(__dirname, '..', 'resources', 'tray.png');

  var menuTemplate = getMenuTemplate();
  var menu = Menu.buildFromTemplate(menuTemplate);

  tray = new Tray(iconPath);
  tray.setContextMenu(menu);

  return tray;
};
