//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RECEIVE_DISPLAYS } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function displaysReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_DISPLAYS:
      return action.displays;
    default:
      return state;
  }
}
