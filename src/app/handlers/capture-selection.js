'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (displayId) {
    var display = components.screen.getDisplayById(displayId);
    if (!display) {
      display = components.screen.getActiveDisplay();
    }

    if (components.settings.get('close-before-capture')) {
      components.windows.dashboard.hide();
    }

    components.screen.captureDisplay(display.id, function (err, dataURL) {
      if (err) throw err;

      components.windows.selection.open({
        dataURL: dataURL,
        displayBounds: display.bounds
      }, function (err, selectionDataURL) {
        if (err) {
          // Failed or cancelled
        } else {
          dispatcher.dispatch(appActions.saveImage('selection', selectionDataURL));
        }
        if (components.settings.get('open-after-capture')) {
          components.windows.dashboard.show();
        }
      });
    });
  };

};
