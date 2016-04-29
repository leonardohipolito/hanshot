'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function Dispatcher() {
  var emitter = new EventEmitter();

  this.dispatch = function (action) {
    if (!action) return;
    emitter.emit(action.handler, action);
  }.bind(this);

  this.on = function (handler, callback) {
    emitter.on(handler, function (action) {
      callback(...(action.args || []));
    });
  }.bind(this);
}

module.exports = Dispatcher;
