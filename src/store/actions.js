'use strict';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

exports.receiveDisplays = function (displays) {
  return {
    type: 'DISPLAYS_RECEIVED',
    displays: displays
  };
};

exports.receiveWindows = function (windows) {
  return {
    type: 'WINDOWS_RECEIVED',
    windows: windows
  };
};

exports.receiveSettings = function (settings) {
  return {
    type: 'SETTINGS_RECEIVED',
    settings: settings
  };
};

exports.receiveUploaders = function (uploaders) {
  return {
    type: 'UPLOADERS_RECEIVED',
    uploaders: uploaders
  };
};

exports.receiveImage = function (image) {
  return {
    type: 'IMAGE_RECEIVED',
    image: image
  };
};
