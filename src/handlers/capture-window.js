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
    return function captureWindowHandler(windowId) {
      if (settings.get('close-before-capture')) {
        dashboardWindow.hide();
      }
      screen.captureWindow(windowId, (err, dataURL) => {
        if (err) throw err;
        dispatch(saveImage('window', dataURL));
        if (settings.get('open-after-capture')) {
          dashboardWindow.show();
        }
      });
    };
  },

};
