//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import SelectionWindow from './selection-window';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function selectionWindowProvider() {
  let selectionWindow = null;

  function close() {
    if (selectionWindow === null) return;

    selectionWindow.destroy();
    selectionWindow = null;
  }

  function open(options, callback) {
    if (selectionWindow !== null) return;

    // TODO: bug with positioning, frame is visible

    // Window can't be "show: false" and "fullscreen: true" at the same time,
    // two modes are considered conflicting.
    // https://github.com/electron/electron/issues/3228
    selectionWindow = new SelectionWindow({
      // show: false,
      // frame: false,
      // Setting zero width and height to not to have weird flickers
      // when window tries to transition to a fullscreen mode. Otherwise, it
      // will show original window for a second, and then fullscreened one.
      // width: 0,
      // height: 0,
      // Transparency allows to hide white flickering background
      // when transitioning to fullscreen
      // transparent: true,
    });

    // Send image when window is ready
    selectionWindow.on('load', () => {
      selectionWindow.onceMessage('complete', (err, dataURL) => {
        if (err) {
          callback(err);
          close();
        } else {
          callback(null, dataURL);
          close();
        }
      });

      selectionWindow.onceMessage('ready', () => {
        selectionWindow.fullscreen();
      });

      selectionWindow.sendMessage('image', {
        dataURL: options.dataURL,
        displayBounds: options.displayBounds,
      });
    });

    selectionWindow.on('close', () => {
      callback(new Error('canceled'));
      close();
    });
  }

  return {
    open,
  };
}
