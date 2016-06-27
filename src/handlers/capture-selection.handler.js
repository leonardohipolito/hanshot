//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { saveImage } from '../actions';
import { IMAGE_SOURCE_SELECTION } from '../constants';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function captureSelectionHandler(
  dispatch, settings, screen,
  dashboardWindow, selectionWindow, savePathFactory
) {
  return function captureSelection(optDisplayId) {
    let display = screen.getDisplayById(optDisplayId);
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
        const savePath = savePathFactory(IMAGE_SOURCE_SELECTION);

        if (selectionErr) {
          console.log('SEL ERR', selectionErr);
          // Failed or cancelled
        } else {
          dispatch(saveImage(savePath, selectionDataURL));
        }

        if (settings.get('open-after-capture')) {
          dashboardWindow.show();
        }
      });
    });
  };
}

captureSelectionHandler.inject = [
  'dispatch', 'settings', 'screen',
  'dashboardWindow', 'selectionWindow', 'savePathFactory',
];
