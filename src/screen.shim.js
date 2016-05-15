//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function getActiveDisplay() {
  const cursorPoint = electron.screen.getCursorScreenPoint();
  const activeDisplay = electron.screen.getDisplayNearestPoint(cursorPoint);
  return activeDisplay;
}
