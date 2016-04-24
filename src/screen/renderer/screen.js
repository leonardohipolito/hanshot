'use strict';

var electron = require('electron');

var video = document.querySelector('video');
var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

electron.ipcRenderer.on('screen-windows-requested', function (event) {
  getSources(['window'], function (err, windows) {
    event.sender.send('screen-windows-received', windows);
  });
});

electron.ipcRenderer.on('screen-capture-display', function (event, options) {
  getSource('screen:0:0', function (err, source) {
    if (err) throw err;
    captureDisplay(source, options, function (err, dataURL) {
      event.sender.send('screen-capture-display-ready', null, dataURL);
    });
  });
});

electron.ipcRenderer.on('screen-capture-window', function (event, options) {
  getSource(options.windowId, function (err, source) {
    if (err) throw err;
    captureWindow(source, options, function (err, dataURL) {
  //     event.sender.send('screen-capture-window-ready', null, dataURL);
    });
  });
});

function getSources(types, callback) {
  var options = {
    types: types || ['window', 'screen']
  };
  electron.desktopCapturer.getSources(options, function (err, sources) {
    if (err) throw err;
    callback(null, sources);
  });
}

function getSource(sourceId, callback) {
  getSources(null, function (err, sources) {
    var found = sources.some(function (source) {
      if (source.id === sourceId) {
        callback(null, source);
        return true;
      }
    });
    if (!found) {
      callback(null);
    }
  });
}

function captureDisplay(source, options, callback) {
  navigator.webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
        maxWidth: options.overallBounds.width,
        maxHeight: options.overallBounds.height
      }
    }
  }, function onSuccess(stream) {

    video.src = URL.createObjectURL(stream);
    video.addEventListener('loadeddata', function onLoadedData() {

      canvas.width = options.displayBounds.width;
      canvas.height = options.displayBounds.height;

      ctx.drawImage(video, -options.displayBounds.x, -options.displayBounds.y);

      var dataURL = canvas.toDataURL('image/png');
      callback(null, dataURL);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // http://stackoverflow.com/a/28060352/1573638
      video.pause();
      video.src = '';
      video.load();
      video.removeEventListener('loadeddata', onLoadedData);
    }, false);

  }, function onFail(err) {
    console.log('err', err);
    callback(err);
  });
}

function captureWindow(source, options, callback) {
  navigator.webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
        maxWidth: options.overallBounds.width,
        maxHeight: options.overallBounds.height
      }
    }
  }, function onSuccess(stream) {

    video.src = URL.createObjectURL(stream);
    video.addEventListener('loadeddata', function onLoadedData() {

      canvas.width = options.displayBounds.width;
      canvas.height = options.displayBounds.height;

      ctx.drawImage(video, 0, 0);

      var croppedCanvas = autocropRightBottomAlpha(canvas);

      var dataURL = croppedCanvas.toDataURL('image/png');
      callback(null, dataURL);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // http://stackoverflow.com/a/28060352/1573638
      video.pause();
      video.src = '';
      video.load();
      video.removeEventListener('loadeddata', onLoadedData);
    }, false);

  }, function onFail(err) {
    console.log('err', err);
    callback(err);
  });
}

// Based on https://gist.github.com/remy/784508
function autocropRightBottomAlpha(canvas) {

  var ctx = canvas.getContext('2d');
  var copy = document.createElement('canvas').getContext('2d');
  var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

  var cropX = 0, cropY = 0;

  for (var i = 0; i < pixels.data.length; i += 4) {
    var alpha = pixels.data[i+3];
    if (alpha !== 0) {

      // ?
      var x = (i / 4) % canvas.width;
      var y = ~~((i / 4) / canvas.width);

      cropX = Math.max(cropX, x);
      cropY = Math.max(cropY, y);
    }
  }

  if (!(cropX > 0 && cropY > 0)) {
    return canvas;
  }

  var cropped = ctx.getImageData(0, 0, cropX, cropY);

  copy.canvas.width = cropX;
  copy.canvas.height = cropY;
  copy.putImageData(cropped, 0, 0);

  return copy.canvas;
}
