'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var appActions = require('./app/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.parseAction = function (args) {

  var action = null;

  if (args.indexOf('--desktop') > -1) {
    action = appActions.captureDesktop();
  } else if (args.indexOf('--selection') > -1) {
    action = appActions.captureSelection();
  }

  return action;
};
