'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (action) {
    if (components.settings.get('close-before-capture')) {
      components.windows.dashboard.hide();
    }
    components.screen.captureDisplay(action.displayId, function (err, dataURL) {
      if (err) throw err;
      dispatcher.dispatch(appActions.saveImage('desktop', dataURL));
      if (components.settings.get('open-after-capture')) {
        components.windows.dashboard.show();
      }
    });
  };

};
