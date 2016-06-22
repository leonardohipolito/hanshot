//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as storeActions from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function showAlertHandler(store) {
  return function showAlert(alert) {
    store.dispatch(storeActions.showAlert(alert));
  };
}

showAlertHandler.inject = ['store'];
