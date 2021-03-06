//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RECEIVE_IMAGE } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function imageReducer(state = null, action) {
  switch (action.type) {
    case RECEIVE_IMAGE:
      if (action.image === null) {
        return null;
      }
      return Object.assign({}, action.image);
    default:
      return state;
  }
}
