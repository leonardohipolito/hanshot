'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

var Tray = electron.Tray;
var Menu = electron.Menu;

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var trayInstance = null;

function getMenuTemplate() {
  var template = [
    { label: 'Item 1', type: 'radio' }
  ];
  return template;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

var tray = {};

tray.create = function () {
  if (trayInstance) {
    return trayInstance;
  }

  var iconPath = path.join(__dirname, '..', 'resources', 'tray.png');
  var menuTemplate = getMenuTemplate();
  var menu = Menu.buildFromTemplate(menuTemplate);

  trayInstance = new Tray(iconPath);
  trayInstance.setContextMenu(menu);

  return trayInstance;
}

tray.destroy = function () {
  if (!trayInstance) {
    return false;
  }
  trayInstance.destroy();
  trayInstance = null;
  return true;
}

module.exports = tray;
