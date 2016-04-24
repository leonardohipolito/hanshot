'use strict';

exports.parseAction = function (args) {

  var action = null;

  if (args.indexOf('--desktop') > -1) {
    action = {
      actionName: 'capture-desktop'
    };
  } else if (args.indexOf('--selection') > -1) {
    action = {
      actionName: 'capture-selection'
    };
  }

  return action;
};
