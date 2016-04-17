'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

exports.openImage = function () {
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

exports.saveImageAs = function (fileName, callback) {
  electron.dialog.showSaveDialog({
    defaultPath: path.join(electron.app.getPath('pictures'), fileName),
    filters: [
      {
        name: 'All Compatible Image Formats',
        extensions: ['jpg', 'png']
      },
      { name: 'PNG', extensions: ['png'] },
      { name: 'JPEG', extensions: ['jpg'] }
    ]
  }, function (filePath) {
    if (filePath) {
      callback(filePath);
    } else {
      // "Cancel" pressed
    }
  });
};

exports.saveImagesTo = function (dirPath) {
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
