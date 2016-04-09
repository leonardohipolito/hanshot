'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');
var mkdirp = require('mkdirp');

var Image = require('./image/image');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

function createFileName(type) {
  var types = {
    'desktop': 'desktop',
    'selection': 'selection',
    'window': 'window',
    'clipboard': 'clipboard',
    'open': 'open'
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

function createExt(imageFormat) {
  var formats = {
    jpg: 'jpg',
    png: 'png'
  };
  return formats[imageFormat];
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

// TODO: this is getting ugly, maybe think about implementing everything using events
function Api(dashboardWindow, settingsWindow, screen, settings, cache, gallery) {
  this.dashboardWindow = dashboardWindow;
  this.settingsWindow = settingsWindow;
  this.screen = screen;
  this.settings = settings;
  this.cache = cache;
  this.gallery = gallery;
}

Api.prototype.openWindow = function () {
  this.dashboardWindow.open();
};

Api.prototype.openSettings = function () {
  this.settingsWindow.open();
};

Api.prototype.captureDesktop = function (displayId) {
  if (this.settings.get('close-before-capture')) {
    this.dashboardWindow.hide();
  }
  this.screen.captureDesktop(displayId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('desktop', snapshot);
    if (this.settings.get('open-after-capture')) {
      this.dashboardWindow.show();
    }
  }.bind(this));
};

Api.prototype.captureSelection = function (displayId) {
  if (this.settings.get('close-before-capture')) {
    this.dashboardWindow.hide();
  }
  this.screen.captureSelection(displayId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('selection', snapshot);
    if (this.settings.get('open-after-capture')) {
      this.dashboardWindow.show();
    }
  }.bind(this));
};

Api.prototype.captureWindow = function (windowId) {
  if (this.settings.get('close-before-capture')) {
    this.dashboardWindow.hide();
  }
  this.screen.captureWindow(windowId, function (err, snapshot) {
    if (err) throw err;
    this.writeFile('window', snapshot);
    if (this.settings.get('open-after-capture')) {
      this.dashboardWindow.show();
    }
  }.bind(this));
};

Api.prototype.openFile = function (filePath) {
  this.gallery.add(Image.createFromPath(filePath));
};

Api.prototype.importFile = function () {
  var self = this;

  var nativeImage = electron.clipboard.readImage();
  if (nativeImage.isEmpty()) {
    console.warn('Image is empty');
    return;
  }
  var buffer = null;
  if (this.settings.get('image-format') === 'jpg') {
    buffer = nativeImage.toJpeg(this.settings.get('jpg-quality'));
  } else {
    buffer = nativeImage.toPng();
  }

  var cacheBaseDir = electron.app.getPath('appData');

  var fileName = [
    createFileName('clipboard'),
    createExt(this.settings.get('image-format'))
  ].join('.');

  var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

  if (this.settings.get('auto-save')) {
    fileDir = this.settings.get('save-dir');
  }

  var filePath = path.join(fileDir, fileName);

  mkdirp(fileDir, function (err) {
    if (err) throw err;

    fs.writeFile(filePath, buffer, function (err) {
      if (err) throw err;

      self.gallery.add(new Image(nativeImage, filePath));

      console.error('Import');
    });
  });
};

Api.prototype.writeFile = function (type, data) {
  var self = this;

  var nativeImage = electron.nativeImage.createFromDataURL(data.dataURL);
  var buffer = null;
  if (this.settings.get('image-format') === 'jpg') {
    buffer = nativeImage.toJpeg(this.settings.get('jpg-quality'));
  } else {
    buffer = nativeImage.toPng();
  }

  var cacheBaseDir = electron.app.getPath('appData');

  var fileName = [
    createFileName(type),
    createExt(this.settings.get('image-format'))
  ].join('.');

  var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

  if (this.settings.get('auto-save')) {
    fileDir = this.settings.get('save-dir');
  }

  var filePath = path.join(fileDir, fileName);

  mkdirp(fileDir, function (err) {
    if (err) throw err;

    fs.writeFile(filePath, buffer, function (err) {
      if (err) throw err;

      self.gallery.add(new Image(nativeImage, filePath));

      console.error('Shot');
    });
  });
};

Api.prototype.saveFileAs = function (filePath, image) {
  var buffer = null;

  var ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    buffer = image.toJpgBuffer(this.settings.get('jpg-quality'));
  } else {
    buffer = image.toPngBuffer();
  }

  fs.writeFile(filePath, buffer, function (err) {
    if (err) throw err;

    console.log('Save as');
  });
};

module.exports = Api;
