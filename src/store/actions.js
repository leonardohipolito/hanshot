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

exports.updateSetting = function (key, value) {
  return {
    type: 'UPDATE_SETTING',
    key: key,
    value: value
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

exports.showAlert = function (alert) {
  return {
    type: 'SHOW_ALERT',
    alert: alert
  };
};

exports.closeAlert = function ( alertId ) {
  return {
    type: 'CLOSE_ALERT',
    alertId: alertId
  };
};

exports.receiveMetadata = function (metadata) {
  return {
    type: 'RECEIVE_METADATA',
    metadata: metadata
  };
};
