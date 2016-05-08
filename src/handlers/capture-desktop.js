//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { saveImage } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: ['dispatch', 'settings', 'screen', 'dashboardWindow'],

  create(dispatch, settings, screen, dashboardWindow) {
    return function captureDesktopHandler(displayId) {
      if (settings.get('close-before-capture')) {
        dashboardWindow.hide();
      }
      screen.captureDisplay(displayId, (err, dataURL) => {
        if (err) throw err;
        dispatch(saveImage('desktop', dataURL));
        if (settings.get('open-after-capture')) {
          dashboardWindow.show();
        }
      });
    };
  },

};
