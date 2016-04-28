'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

exports.authorizeUploader = function (uploaderId) {
  return {
    actionName: 'authorizeUploader',
    uploaderId: uploaderId
  };
};

exports.captureDesktop = function (displayId) {
  return {
    actionName: 'captureDesktop',
    displayId: displayId // optional
  };
};

exports.captureSelection = function (displayId) {
  return {
    actionName: 'captureSelection',
    displayId: displayId // optional
  };
};

exports.captureWindow = function (windowId) {
  return {
    actionName: 'captureWindow',
    windowId: windowId
  };
};

exports.closeAlert = function (alertId) {
  return {
    actionName: 'closeAlert',
    alertId: alertId
  };
};

exports.copyImage = function (filePath) {
  return {
    actionName: 'copyImage',
    filePath: filePath
  };
};

exports.copyText = function (text) {
  return {
    actionName: 'copyText',
    text: text
  };
};

exports.importImageFromClipboard = function () {
  return {
    actionName: 'importImageFromClipboard'
  };
};

exports.openDashboard = function () {
  return {
    actionName: 'openDashboard'
  };
};

exports.openImageContextMenu = function (filePath) {
  return {
    actionName: 'openImageContextMenu',
    filePath: filePath
  };
};

exports.openSettings = function () {
  return {
    actionName: 'openSettings'
  };
};

exports.quitApp = function () {
  return {
    actionName: 'quitApp'
  };
};

exports.saveImage = function (type, dataURL) {
  return {
    actionName: 'saveImage',
    type: type,
    dataURL: dataURL
  };
};

exports.showDialogToOpenImage = function () {
  return {
    actionName: 'showDialogToOpenImage'
  };
};

exports.showDialogToPickSaveDir = function () {
  return {
    actionName: 'showDialogToPickSaveDir'
  };
};

exports.showImageInFolder = function (filePath) {
  return {
    actionName: 'showImageInFolder',
    filePath: filePath
  };
};

exports.updateSetting = function (key, value) {
  return {
    actionName: 'updateSetting',
    key: key,
    value: value
  };
};

exports.uploadImage = function (filePath, uploaderId) {
  return {
    actionName: 'uploadImage',
    filePath: filePath,
    uploaderId: uploaderId // optional
  };
};
