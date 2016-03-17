'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var Jimp = require('./lib/jimp-extended');

var nativeImage = electron.nativeImage;

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

function writeTmp(data) {
  var image = nativeImage.createFromDataURL(data.dataURL);
  var buf = image.toPng();

  Jimp.read(buf, function (err, image) {

    // TODO: crop right in capture.html, return buffer from screen
    if (data.autocrop) {
      image.autocropRightBottomAlpha();
    }

    image.write('tmp.png');
    console.error('Shot');

  });
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Api(settings, screen, userWindow) {
  this.settings = settings;
  this.screen = screen;
  this.userWindow = userWindow;
}

Api.prototype.openWindow = function () {
  this.userWindow.show();
};

Api.prototype.openSettings = function () {
  this.settings.open();
};

Api.prototype.captureDesktop = function (displayId) {
  if (this.settings.get('close_before_capture')) {
    this.userWindow.hide();
  }
  this.screen.captureDesktop(displayId, function (err, snapshot) {
    if (err) throw err;
    writeTmp(snapshot);
    if (this.settings.get('open_after_capture')) {
      this.userWindow.show();
    }
  }.bind(this));
};

Api.prototype.captureSelection = function (displayId) {
  if (this.settings.get('close_before_capture')) {
    this.userWindow.hide();
  }
  this.screen.captureSelection(displayId, function (err, snapshot) {
    if (err) throw err;
    writeTmp(snapshot);
    if (this.settings.get('open_after_capture')) {
      this.userWindow.show();
    }
  }.bind(this));
};

Api.prototype.captureWindow = function (windowId) {
  if (this.settings.get('close_before_capture')) {
    this.userWindow.hide();
  }
  this.screen.captureWindow(windowId, function (err, snapshot) {
    if (err) throw err;
    writeTmp(snapshot);
    if (this.settings.get('open_after_capture')) {
      this.userWindow.show();
    }
  }.bind(this));
};

module.exports = Api;
