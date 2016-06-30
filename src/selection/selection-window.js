//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class SelectionWindow extends Window {

  constructor() {
    super('selection', `file://${__dirname}/selection/renderer/selection.html`);
  }

}
