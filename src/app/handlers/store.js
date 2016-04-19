'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var storeActions = require('../../store/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('close-alert', function (action) {
    components.store.dispatch(
      storeActions.closeAlert( action.alertId )
    );
  });

};
