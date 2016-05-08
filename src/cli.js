//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const appActions = require('./actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function parseAction(args) {
  let action = null;

  if (args.indexOf('--desktop') > -1) {
    action = appActions.captureDesktop();
  } else if (args.indexOf('--selection') > -1) {
    action = appActions.captureSelection();
  }

  return action;
}
