'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var util = require('util');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Provider(sourceFn) {
  EventEmitter.call(this);

  this.sourceFn = sourceFn || function () {};
}

util.inherits(Provider, EventEmitter);

Provider.prototype.triggerUpdate = function (params) {
  this.sourceFn(params, function (err, data) {
    this.emit('update', err, data);
  }.bind(this));
};

Provider.prototype.addUpdateListener = function (callback) {
  this.on('update', callback);
};

Provider.prototype.removeUpdateListener = function (callback) {
  this.removeListener('update', callback);
};

module.exports = Provider;
