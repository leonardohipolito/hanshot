//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Window from '../window.shim';
import { SOURCE_PATH } from '../config';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class SelectionWindow extends Window {

  constructor() {
    super(
      'selection',
      `file://${SOURCE_PATH}/selection/renderer/selection.html`
    );
  }

}
