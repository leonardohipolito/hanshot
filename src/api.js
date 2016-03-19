'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

var Jimp = require('./lib/jimp-extended');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

function createFileName(type) {
  var types = {
    'desktop': 'desktop',
    'selection': 'selection',
    'window': 'window'
  };

  var fileName = types[type];

  var date = new Date();

  fileName += '_' + [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ].join('-');

  return fileName;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Api(dashboard, screen, settings) {
  this.dashboard = dashboard;
  this.screen = screen;
  this.settings = settings;
}

Api.prototype.openWindow = function () {
  this.dashboard.show();
};

Api.prototype.openSettings = function () {
  this.settings.open();
};

Api.prototype.captureDesktop = function (displayId) {
  if (this.settings.get('close_before_capture')) {
    this.dashboard.hide();
  }
  this.screen.captureDesktop(displayId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('desktop', snapshot);
    if (this.settings.get('open_after_capture')) {
      this.dashboard.show();
    }
  }.bind(this));
};

Api.prototype.captureSelection = function (displayId) {
  if (this.settings.get('close_before_capture')) {
    this.dashboard.hide();
  }
  this.screen.captureSelection(displayId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('selection', snapshot);
    if (this.settings.get('open_after_capture')) {
      this.dashboard.show();
    }
  }.bind(this));
};

Api.prototype.captureWindow = function (windowId) {
  if (this.settings.get('close_before_capture')) {
    this.dashboard.hide();
  }
  this.screen.captureWindow(windowId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('window', snapshot);
    if (this.settings.get('open_after_capture')) {
      this.dashboard.show();
    }
  }.bind(this));
};

Api.prototype.writeFile = function (type, data) {
  var image = electron.nativeImage.createFromDataURL(data.dataURL);
  var buf = image.toPng();

  Jimp.read(buf, function (err, image) {

    // TODO: crop right in capture.html, return buffer from screen
    if (data.autocrop) {
      image.autocropRightBottomAlpha();
    }

    var fileName = createFileName(type) + '.png';
    var filePath = path.join(this.settings.get('save_dir'), fileName);

    image.write(filePath);

    console.error('Shot');

  }.bind(this));
};

module.exports = Api;
