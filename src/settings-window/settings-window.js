//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class SettingsWindow extends Window {

  constructor(options) {
    super(
      'settings',
      `file://${__dirname}/settings-window/renderer/settings.html`,
      options
    );
  }

  sendState(state) {
    this.sendMessage('state-updated', state);
  }

}
