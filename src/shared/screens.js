'use strict';

// Module works for both main and renderer processes

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const electron = require('electron');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

function getOverallBounds() {

  var bounds = { x: 0, y: 0, width: 0, height: 0 };

  var displays = electron.screen.getAllDisplays();

  // TODO: handle displays located vertically and/or horizontally
  // now it's only working for all displays located horizontally
  displays.forEach(function (display) {
    bounds.width += display.bounds.width;
    bounds.height = Math.max(bounds.height, display.bounds.height);
  });

  return bounds;
}

function getNames() {

  var displays = electron.screen.getAllDisplays();
  var primaryDisplay = electron.screen.getPrimaryDisplay();

  var names = displays.map(function (display) {
    var name = display.bounds.width + 'x' + display.bounds.height;
    if (display.id === primaryDisplay.id) {
      name += ' (primary)';
    }
    return {
      id: display.id,
      name: name
    };
  });

  return names;
}

function getDisplayById(displayId) {

  var displays = electron.screen.getAllDisplays();

  for (var i = 0; i < displays.length; i++) {
    if (displays[i].id === displayId) {
      return displays[i];
    }
  }

  return null;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = {
  getOverallBounds: getOverallBounds,
  getNames: getNames,
  getDisplayById: getDisplayById
};
