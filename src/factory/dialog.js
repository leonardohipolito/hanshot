'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require('path');

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

exports.openImage = function (callback) {
  electron.dialog.showOpenDialog({
    defaultPath: electron.app.getPath('pictures'),
    properties: ['openFile'],
    filters: [
      {
        name: 'All Compatible Image Formats',
        extensions: ['jpg', 'png']
      }
    ],
  }, function (filePaths) {
    if (filePaths) {
      callback(filePaths[0]);
    } else {
      // "Cancel" pressed
    }
  });
};

exports.saveImagesTo = function (dirPath, callback) {
  electron.dialog.showOpenDialog({
    defaultPath: dirPath,
    properties: ['openDirectory', 'createDirectory']
  }, function (dirPaths) {
    if (dirPaths) {
      callback(dirPaths[0]);
    } else {
      // "Cancel" pressed
    }
  });
};
