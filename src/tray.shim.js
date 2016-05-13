//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createTray(iconPath) {
  const tray = new electron.Tray(iconPath);

  return {

    setMenu(template) {
      const menu = electron.Menu.buildFromTemplate(template);
      tray.setContextMenu(menu);
    },

  };
}
