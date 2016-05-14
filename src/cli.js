//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const actions = require('./actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function parseAction(args, isAnotherInstance = false) {
  let action = null;

  if (isAnotherInstance && !args.length) {
    action = actions.openDashboard();
  } else if (args.indexOf('--desktop') > -1) {
    action = actions.captureDesktop();
  } else if (args.indexOf('--selection') > -1) {
    action = actions.captureSelection();
  }

  return action;
}
