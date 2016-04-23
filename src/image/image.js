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

function Image(filePath, publicUrls) {

  this.loaded = false;
  this.empty = true;

  this.filePath = filePath;
  this.fileName = path.basename(filePath);

  this.publicUrls = publicUrls || [];

  // Available when loaded

  this.native = null;
  this.dataURL = null;

  this.width = null;
  this.height = null;

  this.fileSize = null;
  this.fileSizeHuman = null;
}

Image.prototype.isLoaded = function () {
  return this.loaded;
};

Image.prototype.isEmpty = function () {
  return this.empty;
};

Image.prototype.load = function (native) {
  if (this.loaded) {
    return this;
  }

  if (!native) {
    // TODO: make image load async?
    native = electron.nativeImage.createFromPath(this.filePath);
  }

  this.loaded = true;
  this.empty = native.isEmpty();
  if (this.empty) {
    return this;
  }

  this.native = native;
  this.dataURL = native.toDataURL();

  var size = native.getSize();

  this.width = size.width;
  this.height = size.height;

  // TODO: make stats async?
  var stats = fs.statSync(this.filePath);

  this.fileSize = stats.size;
  this.fileSizeHuman = formatFileSize(this.fileSize);

  return this;
};

Image.prototype.addPublicUrl = function (publicUrl) {
  this.publicUrls.push(publicUrl);
  return this;
};

Image.prototype.getFilePath = function () {
  return this.filePath;
};

Image.prototype.getFileName = function () {
  return this.fileName;
};

Image.prototype.getPublicUrls = function () {
  return this.publicUrls;
};

Image.prototype.getNative = function () {
  return this.native;
};

Image.prototype.toPngBuffer = function () {
  return this.native && this.native.toPng();
};

Image.prototype.toJpgBuffer = function (quality) {
  return this.native && this.native.toJpeg(quality);
};

Image.prototype.serialize = function () {
  return {
    isLoaded: this.loaded,
    isEmpty: this.empty,

    filePath: this.filePath,
    fileName: this.fileName,
    publicUrls: this.publicUrls,

    dataURL: this.dataURL,
    width: this.width,
    height: this.height,
    fileSize: this.fileSize,
    fileSizeHuman: this.fileSizeHuman
  };
};

module.exports = Image;
