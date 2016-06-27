//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class SettingsWindow extends Window {

  constructor(options) {
    super('settings', `file://${__dirname}/renderer/settings.html`, options);
  }

  sendState(state) {
    this.sendMessage('state-updated', state);
  }

}
