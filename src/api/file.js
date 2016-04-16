'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');
var mkdirp = require('mkdirp');

var Image = require('../image/image');

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
// Public Interface
//------------------------------------------------------------------------------

module.exports = function createWriteApi(app) {

  return {

    opem: function (filePath) {
      app.gallery.add(Image.createFromPath(filePath));
    },

    import: function (type, dataURL) {

      var nativeImage = electron.clipboard.readImage();
      if (nativeImage.isEmpty()) {
        console.warn('Image is empty');
        return;
      }

      var buffer = null;
      if (app.settings.get('image-format') === 'jpg') {
        buffer = nativeImage.toJpeg(app.settings.get('jpg-quality'));
      } else {
        buffer = nativeImage.toPng();
      }

      var cacheBaseDir = electron.app.getPath('appData');

      var fileName = [
        createFileName('clipboard'),
        createExt(app.settings.get('image-format'))
      ].join('.');

      var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

      if (app.settings.get('auto-save')) {
        fileDir = app.settings.get('save-dir');
      }

      var filePath = path.join(fileDir, fileName);

      mkdirp(fileDir, function (err) {
        if (err) throw err;

        fs.writeFile(filePath, buffer, function (err) {
          if (err) throw err;

          app.gallery.add(new Image(nativeImage, filePath));

          console.log('Import');
        });
      });

    },

    write: function (type, dataURL) {

      var nativeImage = electron.nativeImage.createFromDataURL(dataURL);

      var buffer = null;
      if (app.settings.get('image-format') === 'jpg') {
        buffer = nativeImage.toJpeg(app.settings.get('jpg-quality'));
      } else {
        buffer = nativeImage.toPng();
      }

      var cacheBaseDir = electron.app.getPath('appData');

      var fileName = [
        createFileName(type),
        createExt(app.settings.get('image-format'))
      ].join('.');

      var fileDir = path.join(cacheBaseDir, 'hanshot', 'unsaved');

      if (app.settings.get('auto-save')) {
        fileDir = app.settings.get('save-dir');
      }

      var filePath = path.join(fileDir, fileName);

      mkdirp(fileDir, function (err) {
        if (err) throw err;

        fs.writeFile(filePath, buffer, function (err) {
          if (err) throw err;

          app.gallery.add(new Image(nativeImage, filePath));

          console.log('Shot');
        });
      });

    },

    saveAs: function (filePath, image) {

      var buffer = null;
      var ext = path.extname(filePath).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg') {
        buffer = image.toJpgBuffer(app.settings.get('jpg-quality'));
      } else {
        buffer = image.toPngBuffer();
      }

      fs.writeFile(filePath, buffer, function (err) {
        if (err) throw err;

        console.log('Save as');
      });

    }

  };

};
