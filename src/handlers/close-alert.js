//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import storeActions from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: ['store'],

  create(store) {
    return function closeAlertHandler(alertId) {
      store.dispatch(storeActions.closeAlert(alertId));
    };
  },

};
