'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on(appActions.OPEN_DASHBOARD, function () {
    components.windows.dashboard.open();
  });

  dispatcher.on(appActions.OPEN_SETTINGS, function () {
    components.windows.settings.open();
  });

};
