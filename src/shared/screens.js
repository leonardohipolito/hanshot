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

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = {
  getOverallBounds: getOverallBounds
};
