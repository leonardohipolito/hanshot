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
      return action.image;
    default:
      return state;
  }
}
