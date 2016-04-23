'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var _ = require('lodash');

var Image = require('./image');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function Gallery() {
  EventEmitter.call(this);

  this.images = [];
}

util.inherits(Gallery, EventEmitter);

Gallery.prototype.reset = function (images) {
  this.images = images.map(function (image) {
    return new Image(image.filePath, image.publicUrls);
  });
};

Gallery.prototype.add = function (image) {
  this.images.push(image);
  this.emit('added', image);
};

Gallery.prototype.update = function (filePath, image) {
  var index = _.findIndex(this.images, function (image) {
    return image.getFilePath() === filePath;
  });
  if (index > -1) {
    if (this.images[index] !== image) {
      this.images.splice(index, 1, image);
    }
    this.emit('updated', image);
  }
  return this;
};

Gallery.prototype.get = function (index) {
  return this.images[index];
};

Gallery.prototype.getFirst = function () {
  return this.get(0);
};

Gallery.prototype.getLast = function () {
  return this.get(this.size() - 1);
};

Gallery.prototype.size = function () {
  return this.images.length;
};

Gallery.prototype.serialize = function () {
  return this.images.map(function (image) {
    return {
      filePath: image.getFilePath(),
      publicUrls: image.getPublicUrls()
    };
  });
};

Gallery.prototype.findByFilePath = function (filePath) {
  return _.find(this.images, function (image) {
    return image.getFilePath() === filePath;
  });
};

module.exports = Gallery;
