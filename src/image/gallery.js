'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var _ = require('lodash');

var Image = require('./image');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Gallery(collection) {
  EventEmitter.call(this);

  this.collection = collection || [];

  this.currentImage = null;
}

util.inherits(Gallery, EventEmitter);

Gallery.prototype.load = function (item) {
  if (this.currentImage && this.currentImage.getFilePath() === item.filePath) {
    return this.currentImage;
  }

  var image = Image.createFromPath(item.filePath);
  if (image) {
    image.publicUrls = item.publicUrls;
  }

  this.currentImage = image;

  return this.currentImage;
};

Gallery.prototype.add = function (image) {
  if (!image) {
    return;
  }
  this.collection.push({
    filePath: image.getFilePath(),
    publicUrls: []
  });
  this.emit('added', image.getFilePath());
};

Gallery.prototype.addPublicUrl = function (filePath, publicUrl) {
  var index = this.findIndex(filePath);
  if (index === -1) {
    return;
  }

  var item = this.collection[index];

  if (!item.publicUrls) {
    item.publicUrls = [];
  }
  item.publicUrls.push(publicUrl);

  this.emit('updated', filePath);
};

Gallery.prototype.find = function (filePath) {
  var index = this.findIndex(filePath);
  return this.get(index);
};

Gallery.prototype.findItem = function (filePath) {
  var index = this.findIndex(filePath);
  return this.collection[index];
};

Gallery.prototype.findIndex = function (filePath) {
  return _.findIndex(this.collection, {
    filePath: filePath
  });
};

Gallery.prototype.get = function (index) {
  var item = this.collection[index];
  if (!item) {
    return null;
  }
  return this.load(item);
};

Gallery.prototype.first = function () {
  return this.get(0);
};

Gallery.prototype.last = function () {
  return this.get(this.size() - 1);
};

Gallery.prototype.size = function () {
  return this.collection.length;
};

Gallery.prototype.serialize = function () {
  return this.collection;
};

module.exports = Gallery;
