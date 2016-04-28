'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var storeActions = require('../../store/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (action) {
    components.settings.set(action.key, action.value);
    components.store.dispatch(
      storeActions.updateSetting(action.key, action.value)
    );
  };

};
