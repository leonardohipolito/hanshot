'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function logAction(action) {
  var out = _.extend({}, action);
  if (out['dataURL']) {
    out['dataURL'] = '... replaced ...';
  }
  console.log('Action: ', out);
}

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

function Dispatcher() {
  var emitter = new EventEmitter();

  this.dispatch = function (action) {
    logAction(action);
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
