'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Dispatcher() {
  EventEmitter.call(this);
}

util.inherits(Dispatcher, EventEmitter);

Dispatcher.prototype.register = function (callback) {
  this.on('dispatch', callback);
};

Dispatcher.prototype.dispatch = function (args) {
  this.emit('dispatch', args);
};

module.exports = Dispatcher;
