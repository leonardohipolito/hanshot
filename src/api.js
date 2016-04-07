'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var fs = require('fs-extra');
var electron = require('electron');

var Jimp = require('./lib/jimp-extended');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

function createFileName(type) {
  var types = {
    'desktop': 'desktop',
    'selection': 'selection',
    'window': 'window',
    'clipboard': 'clipboard'
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

// TODO: this is getting ugly, maybe think about implementing everything using events
function Api(dashboardWindow, settingsWindow, screen, settings, cache) {
  this.dashboardWindow = dashboardWindow;
  this.settingsWindow = settingsWindow;
  this.screen = screen;
  this.settings = settings;
  this.cache = cache;
}

Api.prototype.openWindow = function () {
  this.dashboardWindow.show();
};

Api.prototype.openSettings = function () {
  this.settingsWindow.open();
};

Api.prototype.captureDesktop = function (displayId) {
  if (this.settings.get('close_before_capture')) {
    this.dashboardWindow.hide();
  }
  this.screen.captureDesktop(displayId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('desktop', snapshot);
    if (this.settings.get('open_after_capture')) {
      this.dashboardWindow.show();
    }
  }.bind(this));
};

Api.prototype.captureSelection = function (displayId) {
  if (this.settings.get('close_before_capture')) {
    this.dashboardWindow.hide();
  }
  this.screen.captureSelection(displayId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('selection', snapshot);
    if (this.settings.get('open_after_capture')) {
      this.dashboardWindow.show();
    }
  }.bind(this));
};

Api.prototype.captureWindow = function (windowId) {
  if (this.settings.get('close_before_capture')) {
    this.dashboardWindow.hide();
  }
  this.screen.captureWindow(windowId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('window', snapshot);
    if (this.settings.get('open_after_capture')) {
      this.dashboardWindow.show();
    }
  }.bind(this));
};

Api.prototype.importFile = function () {
  var image = electron.clipboard.readImage();
  if (image.isEmpty()) {
    return;
  }
  var buf = image.toPng();

  Jimp.read(buf, function (err, image) {
    if (err) throw err;

    var cacheBaseDir = electron.app.getPath('appData');

    var fileName = createFileName('clipboard') + '.png';
    var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

    if (this.settings.get('auto_save')) {
      fileDir = this.settings.get('save_dir');
    }

    var filePath = path.join(fileDir, fileName);

    fs.mkdirs(fileDir, function (err) {
      if (err) throw err;

      image.write(filePath, function (err) {
        if (err) throw err;

        var recent = this.cache.get('recent', []);
        recent.unshift(filePath);
        this.cache.set('recent', recent);

        console.error('Import');
      }.bind(this));

    }.bind(this));

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

    var cacheBaseDir = electron.app.getPath('appData');

    var fileName = createFileName(type) + '.png';
    var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

    if (this.settings.get('auto_save')) {
      fileDir = this.settings.get('save_dir');
    }

    var filePath = path.join(fileDir, fileName);

    fs.mkdirs(fileDir, function (err) {
      if (err) throw err;

      image.write(filePath, function (err) {
        if (err) throw err;

        var recent = this.cache.get('recent', []);
        recent.unshift(filePath);
        this.cache.set('recent', recent);

        console.error('Shot');
      }.bind(this));

    }.bind(this));

  }.bind(this));
};

module.exports = Api;
