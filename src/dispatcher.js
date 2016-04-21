'use strict';

var EventEmitter = require('events').EventEmitter;

function Dispatcher() {
  var emitter = new EventEmitter();

  this.dispatch = function (action) {
    console.log('Action:', action);
    if (!action) return;
    emitter.emit(action.actionName, action);
  }.bind(this);

  this.on = function (actionName, callback) {
    emitter.on(actionName, function (action) {
      callback(action);
    })
  }.bind(this);
}

module.exports = Dispatcher;
