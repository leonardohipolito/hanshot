//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { EventEmitter } from 'events';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Dispatcher {

  constructor() {
    const emitter = new EventEmitter();

    return {

      dispatch(action) {
        // Spread action args to handler arguments
        emitter.emit(action.type, ...(action.args || []));
      },

      on(type, hanlder) {
        emitter.on(type, hanlder);
      },

    };
  }

}
