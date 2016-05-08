'use strict';

var electron = require('electron');

var Cropper = require('cropperjs');

var KEY_ESC = 27;
var KEY_ENTER = 13;

var image = document.querySelector('img');
var container = document.getElementById('container');

electron.ipcRenderer.on('selection-image', function (event, options) {

  container.style.width = options.displayBounds.width + 'px';
  container.style.height = options.displayBounds.height + 'px';

  image.addEventListener('load', function () {

    var cropper = new Cropper(image, {
      highlight: false,
      movable: false,
      rotatable: false,
      scalable: false,
      zoomable: false,
      zoomOnWheel: false
    });

    function onEnter(event) {
      if (event.keyCode !== KEY_ENTER) {
        return true;
      }

      var croppedCanvas = cropper.getCroppedCanvas();
      var dataURL = croppedCanvas.toDataURL('image/png');

      electron.ipcRenderer.send('selection-complete', null, dataURL);

      cropper.destroy();

      document.removeEventListener('keyup', onEnter);
    }

    document.addEventListener('keyup', onEnter, true);

    electron.ipcRenderer.send('selection-ready');

  });

  image.src = options.dataURL;

});

document.addEventListener('keyup', function (event) {
  if (event.keyCode === KEY_ESC) {
    electron.ipcRenderer.send('selection-complete', new Error('cancel'));
    return;
  }
}, true);
