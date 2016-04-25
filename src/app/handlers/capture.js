'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var appActions = require('../actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on(appActions.CAPTURE_DESKTOP, function (action) {
    if (components.settings.get('close-before-capture')) {
      components.windows.dashboard.hide();
    }
    components.screen.captureDisplay(action.displayId, function (err, dataURL) {
      if (err) throw err;
      dispatcher.dispatch(appActions.fileWrite('desktop', dataURL));
      if (components.settings.get('open-after-capture')) {
        components.windows.dashboard.show();
      }
    });
  });

  dispatcher.on(appActions.CAPTURE_SELECTION, function (action) {
    var display = components.screen.getDisplayById(action.displayId);
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
          dispatcher.dispatch(appActions.fileWrite('selection', selectionDataURL));
        }
        if (components.settings.get('open-after-capture')) {
          components.windows.dashboard.show();
        }
      });
    });
  });

  dispatcher.on(appActions.CAPTURE_WINDOW, function (action) {
    if (components.settings.get('close-before-capture')) {
      components.windows.dashboard.hide();
    }
    components.screen.captureWindow(action.windowId, function (err, dataURL) {
      if (err) throw err;
      dispatcher.dispatch(appActions.fileWrite('window', dataURL));
      if (components.settings.get('open-after-capture')) {
        components.windows.dashboard.show();
      }
    });
  });

};
