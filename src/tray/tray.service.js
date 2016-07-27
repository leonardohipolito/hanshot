//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Tray from './tray.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function trayService(config, trayMenuFactory) {
  const tray = new Tray(config.TRAY_ICON_PATH);
  tray.setMenu(trayMenuFactory());
  return tray;
}

trayService.inject = ['config', 'trayMenuFactory'];
