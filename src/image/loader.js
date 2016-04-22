'use strict';

var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Image = require('./image');

function ImageLoader() {
  EventEmitter.call(this);

  this.image = null;
  this.watcher = null;
}

util.inherits(ImageLoader, EventEmitter);

ImageLoader.prototype.load = function (filePath, publicUrls) {
  var self = this;

  if (this.image && this.image.getFilePath() === filePath) {
    return this.image;
  }

  if (this.watcher) {
    this.watcher.close();
    this.watcher = null;
  }

  var image = Image.createFromPath(filePath);
  if (!image) {
    this.image = null;
    this.emit('loaded');
    return null;
  }
  image.publicUrls = publicUrls || [];

  this.image = image;

  this.watcher = fs.watch(filePath, function (event, fileName) {

    if (event === 'change') {

      self.image = null;
      self.load(filePath, publicUrls);
      self.emit('updated');

    } else if (event === 'rename') {
      // Can't rely on fileName
      // https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener
      self.image = null;
      self.load(filePath, publicUrls);

    } else {
      // Unknown event
    }

  });

  this.emit('loaded');
  return image;
};

ImageLoader.prototype.addPublicUrl = function (publicUrl) {
  if (!this.image) {
    return;
  }
  this.image.publicUrls.push(publicUrl);
  this.emit('updated');
};

ImageLoader.prototype.getImage = function () {
  return this.image;
};

ImageLoader.prototype.serialize = function () {
  return this.image && this.image.serialize();
};

ImageLoader.prototype.unload = function () {
  this.image = null;
  if (this.watcher) {
    this.watcher.close();
    this.watcher = null;
  }
  this.emit('unloaded');
};

ImageLoader.prototype.destroy = function () {
  this.unload();
};

module.exports = ImageLoader;
