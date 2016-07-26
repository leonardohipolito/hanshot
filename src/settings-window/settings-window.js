//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';
import { SOURCE_PATH } from '../config';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class SettingsWindow extends Window {

  constructor(options) {
    super(
      'settings',
      `file://${SOURCE_PATH}/settings-window/renderer/settings.html`,
      options
    );
  }

  sendState(state) {
    this.sendMessage('state-updated', state);
  }

}
