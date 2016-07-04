//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class SelectionWindow extends Window {

  constructor() {
    super('selection', `file://${__dirname}/../src/selection/renderer/selection.html`);
  }

}
