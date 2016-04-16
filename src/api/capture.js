'use strict';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function createCaptureApi(app, api) {

  return {

    desktop: function (displayId) {
      if (app.settings.get('close-before-capture')) {
        app.windows.dashboard.hide();
      }
      app.screen.captureDisplay(displayId, function (err, dataURL) {
        if (err) throw err;
        api.file.write('desktop', dataURL);
        if (app.settings.get('open-after-capture')) {
          app.windows.dashboard.show();
        }
      });
    },

    window: function (windowId) {
      if (app.settings.get('close-before-capture')) {
        app.windows.dashboard.hide();
      }
      app.screen.captureWindow(windowId, function (err, dataURL) {
        if (err) throw err;
        api.file.write('window', dataURL);
        if (app.settings.get('open-after-capture')) {
          app.windows.dashboard.show();
        }
      });
    },

    selection: function (displayId) {
      var display = app.screen.getDisplayById(displayId);
      if (!display) {
        display = app.screen.getActiveDisplay();
      }

      if (app.settings.get('close-before-capture')) {
        app.windows.dashboard.hide();
      }

      app.screen.captureDisplay(display.id, function (err, dataURL) {
        if (err) throw err;

        app.windows.selection.open({
          dataURL: dataURL,
          displayBounds: display.bounds
        }, function (err, selectionDataURL) {
          if (err) {
            // Failed or cancelled
          } else {
            api.file.write('selection', selectionDataURL);
          }
          if (app.settings.get('open-after-capture')) {
            app.windows.dashboard.show();
          }
        });
      });
    }

  };

};
