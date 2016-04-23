'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');
var mkdirp = require('mkdirp');

var Image = require('../../image/image');
var dialog = require('../../factory/dialog');
var notify = require('../../notification');

//------------------------------------------------------------------------------
// Helpers
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
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('import-open', function () {
    dialog.openImage(function (filePath) {
      components.gallery.add(new Image(filePath));
    });
  });

  dispatcher.on('import-clipboard', function () {
    var nativeImage = electron.clipboard.readImage();
    if (nativeImage.isEmpty()) {
      console.warn('Image is empty');
      return;
    }

    var buffer = null;
    if (components.settings.get('image-format') === 'jpg') {
      buffer = nativeImage.toJpeg(components.settings.get('jpg-quality'));
    } else {
      buffer = nativeImage.toPng();
    }

    var cacheBaseDir = electron.app.getPath('appData');

    var fileName = [
      createFileName('clipboard'),
      createExt(components.settings.get('image-format'))
    ].join('.');

    var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

    if (components.settings.get('save-dir-selected')) {
      fileDir = components.settings.get('save-dir-path');
    }

    var filePath = path.join(fileDir, fileName);

    mkdirp(fileDir, function (err) {
      if (err) throw err;

      fs.writeFile(filePath, buffer, function (err) {
        if (err) throw err;

        var image = new Image(filePath);
        image.load(nativeImage);
        components.gallery.add(image);

        console.log('Import');
      });
    });

  });

  dispatcher.on('write-file', function (action) {

    var nativeImage = electron.nativeImage.createFromDataURL(action.dataURL);

    var buffer = null;
    if (components.settings.get('image-format') === 'jpg') {
      buffer = nativeImage.toJpeg(components.settings.get('jpg-quality'));
    } else {
      buffer = nativeImage.toPng();
    }

    var cacheBaseDir = electron.app.getPath('appData');

    var fileName = [
      createFileName(action.type),
      createExt(components.settings.get('image-format'))
    ].join('.');

    var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

    if (components.settings.get('save-dir-selected')) {
      fileDir = components.settings.get('save-dir-path');
    }

    var filePath = path.join(fileDir, fileName);

    mkdirp(fileDir, function (err) {
      if (err) throw err;

      fs.writeFile(filePath, buffer, function (err) {
        if (err) throw err;

        var image = new Image(filePath);
        image.load(nativeImage);
        components.gallery.add(image);

        if (components.settings.get('upload-after-capture')) {
          dispatcher.dispatch({
            actionName: 'upload',
            filePath: filePath
          });
        } else {
          notify('Screenshot saved');
        }

      });
    });

  });

};
