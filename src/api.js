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

function Api(screen, userWindow) {
  this.screen = screen;
  this.userWindow = userWindow;
}

Api.prototype.openWindow = function () {
  this.userWindow.show();
};

Api.prototype.captureDesktop = function (displayId) {
  this.screen.captureDesktop(displayId, function (err, snapshot) {
    if (err) throw err;
    writeTmp(snapshot);
    this.userWindow.show();
  }.bind(this));
};

Api.prototype.captureSelection = function (displayId) {
  this.screen.captureSelection(displayId, function (err, snapshot) {
    if (err) throw err;
    writeTmp(snapshot);
    this.userWindow.show();
  }.bind(this));
};

Api.prototype.captureWindow = function (windowId) {
  this.screen.captureWindow(windowId, function (err, snapshot) {
    if (err) throw err;
    writeTmp(snapshot);
    this.userWindow.show();
  }.bind(this));
};

module.exports = Api;
