//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';
import { SOURCE_PATH } from '../config';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class DashboardWindow extends Window {

  constructor() {
    super(
      'dashboard',
      `file://${SOURCE_PATH}/dashboard/renderer/dashboard.html`
    );
  }

  sendState(state) {
    this.sendMessage('state-updated', state);
  }

}
