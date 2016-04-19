'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;

var electron = require('electron');

var handlers = [
  require('./handlers/app'),
  require('./handlers/capture'),
  require('./handlers/copy'),
  require('./handlers/file'),
  require('./handlers/settings'),
  require('./handlers/store'),
  require('./handlers/upload'),
  require('./handlers/window')
];

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (components) {

  var dispatcher = new EventEmitter();

  handlers.forEach(function (registerHandlers) {
    registerHandlers(dispatcher, components);
  });

  var tmpActionToEvent = function (action) {
    console.log('Action: ', action);
    if (!action) return;
    dispatcher.emit(action.actionName, action);
  }

  components.windows.dashboard.on('action', tmpActionToEvent);
  components.windows.settings.on('action', tmpActionToEvent);
  components.tray.on('action', tmpActionToEvent);

  return {
    perform: function (action) {
      tmpActionToEvent(action)
    }
  };
};
