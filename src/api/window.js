'use strict';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function createWindowApi (app) {

  return {

    openDashboard: function () {
      app.windows.dashboard.open();
    },

    openSettings: function () {
      app.windows.settings.open();
    }

  };

};
