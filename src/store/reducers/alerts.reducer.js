//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import _ from 'lodash';

import { SHOW_ALERT, CLOSE_ALERT } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function alertsReducer(state = [], action) {
  switch (action.type) {
    case SHOW_ALERT: {
      const isPresent = _.find(state, { id: action.alert.id });
      if (isPresent) {
        return state;
      }
      return state.concat([action.alert]);
    }
    case CLOSE_ALERT:
      return state.filter((alert) => alert.id !== action.alertId);
    default:
      return state;
  }
}
