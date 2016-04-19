'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('capture-desktop', function (action) {
    if (components.settings.get('close-before-capture')) {
      components.windows.dashboard.hide();
    }
    components.screen.captureDisplay(action.displayId, function (err, dataURL) {
      if (err) throw err;
      dispatcher.emit('write-file', {
        type: 'desktop',
        dataURL: dataURL
      });
      if (components.settings.get('open-after-capture')) {
        components.windows.dashboard.show();
      }
    });
  });

  dispatcher.on('capture-window', function (action) {
    if (components.settings.get('close-before-capture')) {
      components.windows.dashboard.hide();
    }
    components.screen.captureWindow(action.windowId, function (err, dataURL) {
      if (err) throw err;
      dispatcher.emit('write-file', {
        type: 'window',
        dataURL: dataURL
      });
      if (components.settings.get('open-after-capture')) {
        components.windows.dashboard.show();
      }
    });
  });

  dispatcher.on('capture-selection', function (action) {
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
          dispatcher.emit('write-file', {
            type: 'selection',
            dataURL: selectionDataURL
          });
        }
        if (components.settings.get('open-after-capture')) {
          components.windows.dashboard.show();
        }
      });
    });
  });

};
