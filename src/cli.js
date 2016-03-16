'use strict';

exports.parseAction = function (args) {

  var action = {
    capture: false,
  };

  if (args.indexOf('-d') > -1) {
    action.capture = 'desktop';
  }
  if (args.indexOf('-s') > -1) {
    action.capture = 'selection';
  }
  if (args.indexOf('-w') > -1) {
    action.capture = 'window';
  }

  return action;

};
