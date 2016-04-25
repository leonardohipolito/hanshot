'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// App

exports.APP_QUIT = 'APP_QUIT';
exports.appQuit = function () {
  return {
    actionName: exports.APP_QUIT
  };
};

// Capture

exports.CAPTURE_DESKTOP = 'CAPTURE_DESKTOP';
exports.captureDesktop = function (displayId) {
  return {
    actionName: exports.CAPTURE_DESKTOP,
    displayId: displayId // optional
  };
};

exports.CAPTURE_SELECTION = 'CAPTURE_SELECTION';
exports.captureSelection = function (displayId) {
  return {
    actionName: exports.CAPTURE_SELECTION,
    displayId: displayId // optional
  };
};

exports.CAPTURE_WINDOW = 'CAPTURE_WINDOW';
exports.captureWindow = function (windowId) {
  return {
    actionName: exports.CAPTURE_WINDOW,
    windowId: windowId
  };
};

// Copy

exports.COPY_IMAGE = 'COPY_IMAGE';
exports.copyImage = function (filePath) {
  return {
    actionName: exports.COPY_IMAGE,
    filePath: filePath
  };
};

exports.COPY_TEXT = 'COPY_TEXT';
exports.copyText = function (text) {
  return {
    actionName: exports.COPY_TEXT,
    text: text
  };
};

// File

exports.FILE_OPEN = 'FILE_OPEN';
exports.fileOpen = function () {
  return {
    actionName: exports.FILE_OPEN
  };
};

exports.FILE_IMPORT_FROM_CLIPBOARD = 'FILE_IMPORT_FROM_CLIPBOARD';
exports.fileImportFromClipboard = function () {
  return {
    actionName: exports.FILE_IMPORT_FROM_CLIPBOARD
  };
};

exports.FILE_WRITE = 'FILE_WRITE';
exports.fileWrite = function (type, dataURL) {
  return {
    actionName: exports.FILE_WRITE,
    type: type,
    dataURL: dataURL
  };
};

// Menu

exports.CONTEXT_MENU = 'CONTEXT_MENU';
exports.contextMenu = function (filePath) {
  return {
    actionName: exports.CONTEXT_MENU,
    filePath: filePath
  };
};

// Settings

exports.UPDATE_SETTING = 'UPDATE_SETTING';
exports.updateSetting = function (key, value) {
  return {
    actionName: exports.UPDATE_SETTING,
    key: key,
    value: value
  };
};

exports.SHOW_DIALOG_TO_PICK_SAVE_DIR = 'SHOW_DIALOG_TO_PICK_SAVE_DIR';
exports.showDialogToPickSaveDir = function () {
  return {
    actionName: exports.SHOW_DIALOG_TO_PICK_SAVE_DIR
  };
};

// Shell

exports.SHOW_IMAGE_IN_FOLDER = 'SHOW_IMAGE_IN_FOLDER';
exports.showImageInFolder = function (filePath) {
  return {
    actionName: exports.SHOW_IMAGE_IN_FOLDER,
    filePath: filePath
  };
};

// Store

exports.CLOSE_ALERT = 'CLOSE_ALERT';
exports.closeAlert = function (alertId) {
  return {
    actionName: exports.CLOSE_ALERT,
    alertId: alertId
  };
};

// Upload

exports.UPLOAD_IMAGE = 'UPLOAD_IMAGE';
exports.uploadImage = function (filePath, uploaderId) {
  return {
    actionName: exports.UPLOAD_IMAGE,
    filePath: filePath,
    uploaderId: uploaderId // optional
  };
};

exports.AUTHORIZE_UPLOADER = 'AUTHORIZE_UPLOADER';
exports.authorizeUploader = function (uploaderId) {
  return {
    actionName: exports.AUTHORIZE_UPLOADER,
    uploaderId: uploaderId
  };
};

// Window

exports.OPEN_DASHBOARD = 'OPEN_DASHBOARD';
exports.openDashboard = function () {
  return {
    actionName: exports.OPEN_DASHBOARD
  };
};

exports.OPEN_SETTINGS = 'OPEN_SETTINGS';
exports.openSettings = function () {
  return {
    actionName: exports.OPEN_SETTINGS
  };
};
