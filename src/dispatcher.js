//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { EventEmitter } from 'events';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createDispatcher() {
  const emitter = new EventEmitter();

  function dispatch(action) {
    // Spread action arguments to handler parameters
    emitter.emit(action.type, ...(action.args || []));
  }

  function on(type, hanlder) {
    emitter.on(type, hanlder);
  }

  return {
    dispatch,
    on,
  };
}
