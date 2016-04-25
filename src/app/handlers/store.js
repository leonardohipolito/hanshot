'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var storeActions = require('../../store/actions');
var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on(appActions.CLOSE_ALERT, function (action) {
    components.store.dispatch(
      storeActions.closeAlert( action.alertId )
    );
  });

};
