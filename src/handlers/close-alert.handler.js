//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as storeActions from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function closeAlertHandler(store) {
  return function closeAlert(alertId) {
    store.dispatch(storeActions.closeAlert(alertId));
  };
}

closeAlertHandler.inject = ['store'];
