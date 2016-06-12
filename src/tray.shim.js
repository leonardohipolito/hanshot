//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Tray {

  constructor(iconPath) {
    this.tray = new electron.Tray(iconPath);
  }

  setMenu(template) {
    const menu = electron.Menu.buildFromTemplate(template);
    this.tray.setContextMenu(menu);
  }

}
