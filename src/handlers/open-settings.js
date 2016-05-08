'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function () {
    components.windows.settings.open();
  };

};
