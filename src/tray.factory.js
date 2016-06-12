//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Tray from './tray.shim';
import { TRAY_ICON_PATH } from './config';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function trayFactory(trayMenu) {
  const tray = new Tray(TRAY_ICON_PATH);
  tray.setMenu(trayMenu);
  return tray;
}

trayFactory.inject = ['trayMenu'];
