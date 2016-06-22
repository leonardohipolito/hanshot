//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { SHOW_ALERT, CLOSE_ALERT } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function alertsReducer(state = [], action) {
  switch (action.type) {
    case SHOW_ALERT: {
      const isPresent = state.find(alert => alert.id === action.alert.id);
      if (isPresent) {
        return state;
      }
      return [
        Object.assign({}, action.alert),
        ...state,
      ];
    }
    case CLOSE_ALERT:
      return state.filter((alert) => alert.id !== action.alertId);
    default:
      return state;
  }
}
