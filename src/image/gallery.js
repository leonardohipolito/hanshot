'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Image = require('./image');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Gallery(paths) {
  EventEmitter.call(this);

  this.paths = paths || [];

  this.currentImage = null;
}

util.inherits(Gallery, EventEmitter);

Gallery.prototype.load = function (filePath) {
  if (this.currentImage && this.currentImage.getFilePath() === filePath) {
    return this.currentImage;
  }

  var image = Image.createFromPath(filePath);

  this.currentImage = image;

  return this.currentImage;
};

Gallery.prototype.add = function (image) {
  if (!image) {
    return;
  }
  this.currentImage = image;
  this.paths.push(image.getFilePath());
  this.emit('added', image);
};

Gallery.prototype.find = function (filePath) {
  var index = this.paths.indexOf(filePath);
  return this.get(index);
};

Gallery.prototype.get = function (index) {
  var filePath = this.paths[index];
  if (!filePath) {
    return null;
  }
  return this.load(filePath);
};

Gallery.prototype.first = function () {
  return this.get(0);
};

Gallery.prototype.last = function () {
  return this.get(this.paths.length - 1);
};

Gallery.prototype.getPaths = function () {
  return this.paths;
};

module.exports = Gallery;
