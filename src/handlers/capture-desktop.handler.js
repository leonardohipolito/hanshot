//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { saveImage } from '../actions';
import { IMAGE_SOURCE_DESKTOP } from '../constants';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function captureDesktopHandler(
  dispatch, settings, screen, dashboardWindow, savePathFactory
) {
  return function captureDesktop(optDisplayId) {
    if (settings.get('close-before-capture')) {
      dashboardWindow.hide();
    }

    screen.captureDisplay(optDisplayId, (err, dataURL) => {
      if (err) throw err;

      const savePath = savePathFactory(IMAGE_SOURCE_DESKTOP);

      dispatch(saveImage(savePath, dataURL));

      if (settings.get('open-after-capture')) {
        dashboardWindow.show();
      }
    });
  };
}

captureDesktopHandler.inject = [
  'dispatch', 'settings', 'screen', 'dashboardWindow', 'savePathFactory',
];
