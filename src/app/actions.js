'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Actions are tightly bound with handlers
// When app initializes, all actions in this file are iterated over
// and each action will have a handler bound to it by { handler: '...' } prop
// { handler: '...' } value must be a file name from "./hanlders" dir

module.exports = {

  authorizeUploader: function (uploaderId) {
    return {
      handler: 'authorize-uploader',
      args: [uploaderId]
    };
  },

  captureDesktop: function (displayId) {
    return {
      handler: 'capture-desktop',
      args: [
        displayId // optional
      ]
    };
  },

  captureSelection: function (displayId) {
    return {
      handler: 'capture-selection',
      args: [
        displayId // optional
      ]
    };
  },

  captureWindow: function (windowId) {
    return {
      handler: 'capture-window',
      args: [windowId]
    };
  },

  closeAlert: function (alertId) {
    return {
      handler: 'close-alert',
      args: [alertId]
    };
  },

  copyImage: function (filePath) {
    return {
      handler: 'copy-image',
      args: [filePath]
    };
  },

  copyText: function (text) {
    return {
      handler: 'copy-text',
      args: [text]
    }
  },

  importImageFromClipboard: function () {
    return {
      handler: 'import-image-from-clipboard'
    };
  },

  openDashboard: function () {
    return {
      handler: 'open-dashboard'
    };
  },

  openImageContextMenu: function (filePath) {
    return {
      handler: 'open-image-context-menu',
      args: [filePath]
    };
  },

  openSettings: function () {
    return {
      handler: 'open-settings'
    };
  },

  quitApp: function () {
    return {
      handler: 'quit-app'
    };
  },

  saveImage: function (type, dataURL) {
    return {
      handler: 'save-image',
      args: [type, dataURL]
    };
  },

  showDialogToOpenImage: function () {
    return {
      handler: 'show-dialog-to-open-image'
    };
  },

  showDialogToPickSaveDir: function () {
    return {
      handler: 'show-dialog-to-pick-save-dir'
    };
  },

  showImageInFolder: function (filePath) {
    return {
      handler: 'show-image-in-folder',
      args: [filePath]
    };
  },

  updateSetting: function (key, value) {
    return {
      handler: 'update-setting',
      args: [key, value]
    };
  },

  uploadImage: function (filePath, uploaderId) {
    return {
      handler: 'upload-image',
      args: [
        filePath,
        uploaderId // optional
      ]
    };
  }

};
