'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (windowId) {
    if (components.settings.get('close-before-capture')) {
      components.windows.dashboard.hide();
    }
    components.screen.captureWindow(windowId, function (err, dataURL) {
      if (err) throw err;
      dispatcher.dispatch(appActions.saveImage('window', dataURL));
      if (components.settings.get('open-after-capture')) {
        components.windows.dashboard.show();
      }
    });
  };

};
