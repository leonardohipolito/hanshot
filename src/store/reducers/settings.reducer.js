//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RECEIVE_SETTINGS, UPDATE_SETTING } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function settingsReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_SETTINGS:
      return action.settings;
    case UPDATE_SETTING: {
      const settings = Object.assign({}, state);
      settings[action.key] = action.value;
      return settings;
    }
    default:
      return state;
  }
}
