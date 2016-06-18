//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RECEIVE_METADATA } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function metadataReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_METADATA:
      return Object.assign({}, action.metadata);
    default:
      return state;
  }
}
