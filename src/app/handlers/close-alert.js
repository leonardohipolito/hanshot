'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var storeActions = require('../../store/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (alertId) {
    components.store.dispatch( storeActions.closeAlert(alertId) );
  };

};
