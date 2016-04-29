'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var storeActions = require('../../store/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (key, value) {
    components.settings.set(key, value);
    components.store.dispatch( storeActions.updateSetting(key, value) );
  };

};
