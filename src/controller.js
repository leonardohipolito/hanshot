'use strict';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function Controller() {
  this.events = {};
}

Controller.prototype.register = function (name, provider) {
  this.events[name] = {
    provider: provider,
    listeners: []
  };
  return this;
};

Controller.prototype.on = function (name, listener) {
  var event = this.events[name];
  if (!event) {
    throw new Error('Cannot subscribe to unregistered event');
  }
  event.listeners.push(listener);
  return this;
};

Controller.prototype.request = function (name, params) {
  var event = this.events[name];
  if (!event) {
    throw new Error('Cannot request unregistered event');
  }
  event.provider(params, function (err, data) {
    event.listeners.forEach(function (listener) {
      listener(err, data);
    });
  });
  return this;
};

module.exports = Controller;
