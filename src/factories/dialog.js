'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var metadata = require('../config/metadata');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.openImage = function (callback) {

  var defaultPath = electron.app.getPath('home');

  var extensions = [];
  var names = [];

  metadata.imageFormats.forEach(function (format) {
    extensions = extensions.concat(format.extensions);
    names.push(format.name);
  });

  electron.dialog.showOpenDialog({
    defaultPath: defaultPath,
    properties: ['openFile'],
    filters: [
      {
        name: 'Supported images (' + names.join(', ') + ')',
        extensions: extensions
      }
    ],
  }, function (filePaths) {
    // Call back only if path selected
    if (filePaths) {
      callback(filePaths[0]);
    } else {
      // "Cancel" pressed
    }
  });
};

exports.saveImagesTo = function (defaultPath, callback) {
  electron.dialog.showOpenDialog({
    defaultPath: defaultPath,
    properties: ['openDirectory', 'createDirectory']
  }, function (dirPaths) {
    // Call back only if path selected
    if (dirPaths) {
      callback(dirPaths[0]);
    } else {
      // "Cancel" pressed
    }
  });
};
