//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class SettingsWindow extends Window {

  constructor() {
    super('settings', `file://${__dirname}/renderer/settings.html`);
  }

  sendState(state) {
    this.sendMessage('state-updated', state);
  }

}
