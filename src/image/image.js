'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Image(native, filePath) {
  this.native = native;
  this.dataURL = native.toDataURL();

  var size = native.getSize();

  this.width = size.width;
  this.height = size.height;

  this.filePath = filePath;
  this.fileName = path.basename(filePath);
}

Image.prototype.getNative = function () {
  return this.native;
};

Image.prototype.getFileName = function () {
  return this.fileName;
};

Image.prototype.getFilePath = function () {
  return this.filePath;
};

Image.createFromPath = function (filePath) {
  var native = electron.nativeImage.createFromPath(filePath);
  if (native.isEmpty()) {
    return null;
  }
  return new Image(native, filePath);
};

module.exports = Image;
