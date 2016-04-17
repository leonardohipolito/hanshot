'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function notificationFactory() {

  var width = 300;
  var height = 150;
  var offset = 20;
  var delay = 3000;

  var cursorPoint = electron.screen.getCursorScreenPoint();
  var activeDisplay = electron.screen.getDisplayNearestPoint(cursorPoint);

  var bounds = activeDisplay.workArea;

  var x = bounds.width - width - offset;
  var y = bounds.y + offset;

  var window = new electron.BrowserWindow({
    width: width,
    height: height,
    x: x,
    y: y,
    transparent: true,
    frame: false
  });

  window.loadURL('file://' + __dirname + '/renderer/notification.html');

  setTimeout(function () {
    window.destroy();
  }, delay);

};
