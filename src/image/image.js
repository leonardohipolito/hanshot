'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var electron = require('electron');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function formatFileSize(bytes) {
  if (bytes >= 1000000000) {
    return (bytes / 1000000000).toFixed(1) + ' GB';
  } else if (bytes >= 1000000) {
    return (bytes / 1000000).toFixed(1) + ' MB';
  } else if (bytes >= 1000) {
    return (bytes / 1000).toFixed(1) + ' KB';
  }
  return bytes + ' B';
}

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

  // TODO: make this async?
  var stats = fs.statSync(filePath);

  this.fileSize = stats.size;
  this.fileSizeHuman = formatFileSize(this.fileSize);
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
