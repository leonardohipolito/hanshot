//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Tray from './tray.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function trayProvider(config, trayMenu) {
  const tray = new Tray(config.TRAY_ICON_PATH);
  tray.setMenu(trayMenu);
  return tray;
}

trayProvider.inject = ['config', 'trayMenu'];
