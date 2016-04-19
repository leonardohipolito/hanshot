'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('open-dashboard', function () {
    components.windows.dashboard.open();
  });

  dispatcher.on('open-settings', function () {
    components.windows.settings.open();
  });

};
