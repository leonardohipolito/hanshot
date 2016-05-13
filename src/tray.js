//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import createTray from './tray.shim';
import createTrayMenu from './menu/tray.menu';
import { TRAY_ICON_PATH } from './config';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createAppTray(dispatch) {
  const appTray = createTray(TRAY_ICON_PATH);

  // TODO: menu might be moved away from tray
  appTray.setMenu(createTrayMenu(dispatch));

  return {
    // TODO: think of a way to prevent GC
    veryBadPreventGC() {
      console.log(appTray);
    },
  };
}

createAppTray.inject = ['dispatch'];
