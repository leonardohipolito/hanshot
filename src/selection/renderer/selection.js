//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Cropper from 'cropperjs';

import RendererIpc from '../../renderer-ipc.shim';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const ipc = new RendererIpc('selection');

const KEY_ESC = 27;
const KEY_ENTER = 13;

const image = document.querySelector('img');
const container = document.getElementById('container');

ipc.onMessage('image', (options) => {
  container.style.width = `${options.displayBounds.width}px`;
  container.style.height = `${options.displayBounds.height}px`;

  image.addEventListener('load', () => {
    const cropper = new Cropper(image, {
      highlight: false,
      movable: false,
      rotatable: false,
      scalable: false,
      zoomable: false,
      zoomOnWheel: false,
    });

    function onEnter(event) {
      if (event.keyCode !== KEY_ENTER) {
        return true;
      }

      const croppedCanvas = cropper.getCroppedCanvas();
      const dataURL = croppedCanvas.toDataURL('image/png');

      ipc.sendMessage('complete', null, dataURL);

      cropper.destroy();

      document.removeEventListener('keyup', onEnter);

      return true;
    }

    document.addEventListener('keyup', onEnter, true);

    ipc.sendMessage('ready');
  });

  image.src = options.dataURL;
});

document.addEventListener('keyup', (event) => {
  if (event.keyCode === KEY_ESC) {
    ipc.sendMessage('complete', new Error('cancel'));
    return;
  }
}, true);
