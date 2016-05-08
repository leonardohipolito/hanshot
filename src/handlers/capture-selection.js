//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { saveImage } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: [
    'dispatch', 'screen', 'settings', 'dashboardWindow', 'selectionWindow',
  ],

  create(dispatch, screen, settings, dashboardWindow, selectionWindow) {
    return function captureSelectionHandler(displayId) {
      let display = screen.getDisplayById(displayId);
      if (!display) {
        display = screen.getActiveDisplay();
      }

      if (settings.get('close-before-capture')) {
        dashboardWindow.hide();
      }

      screen.captureDisplay(display.id, (captureErr, dataURL) => {
        if (captureErr) throw captureErr;

        selectionWindow.open({
          dataURL,
          displayBounds: display.bounds,
        }, (selectionErr, selectionDataURL) => {
          if (selectionErr) {
            // Failed or cancelled
          } else {
            dispatch(saveImage('selection', selectionDataURL));
          }
          if (settings.get('open-after-capture')) {
            dashboardWindow.show();
          }
        });
      });
    };
  },

};
