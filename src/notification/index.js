'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var _ = require('lodash');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function notificationFactory(text, options) {
  text = text || 'undefined';
  options = _.defaults(options, {
    delay: 5000
  });


  var width = 300;
  var height = 100;
  var offset = 20;

  var cursorPoint = electron.screen.getCursorScreenPoint();
  var activeDisplay = electron.screen.getDisplayNearestPoint(cursorPoint);

  var bounds = activeDisplay.workArea;

  var location = 'top';
  var locations = {
    top: {
      x: bounds.width - width - offset,
      y: bounds.y + offset
    },
    bottom: {
      x: bounds.width - width - offset,
      y: bounds.height - height - offset
    }
  };


  var window = new electron.BrowserWindow({
    width: width,
    height: height,
    x: locations[location].x,
    y: locations[location].y,
    transparent: true,
    frame: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false
  });

  var toggleLocation = function () {
    location = location === 'top' ? 'bottom' : 'top';
    window.setPosition(locations[location].x, locations[location].y);
  };

  var setText = function (newText) {
    window.webContents.send('notification-text-updated', newText);
  };

  var close = function () {
    window.destroy();
  };


  window.webContents.once('did-finish-load', function () {
    setText(text);
    window.showInactive();
  });

  electron.ipcMain.on('notification-hover', function () {
    toggleLocation();
  });

  window.loadURL('file://' + __dirname + '/renderer/notification.html');

  if (options.delay) {

    setTimeout(function () {
      close();
    }, options.delay);

  }

  return {
    setText: setText,
    close: close
  };

};
