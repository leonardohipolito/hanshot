//------------------------------------------------------------------------------
// Action types
//------------------------------------------------------------------------------

export const AUTHORIZE_UPLOADER = 'AUTHORIZE_UPLOADER';
export const CAPTURE_DESKTOP = 'CAPTURE_DESKTOP';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const COPY_IMAGE = 'COPY_IMAGE';
export const COPY_TEXT = 'COPY_TEXT';
export const IMPORT_IMAGE_FROM_CLIPBOARD = 'IMPORT_IMAGE_FROM_CLIPBOARD';
export const OPEN_DASHBOARD = 'OPEN_DASHBOARD';
export const OPEN_IMAGE_CONTEXT_MENU = 'OPEN_IMAGE_CONTEXT_MENU';
export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const QUIT_APP = 'QUIT_APP';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const SHOW_ALERT = 'SHOW_ALERT';
export const SHOW_DIALOG_TO_OPEN_IMAGE = 'SHOW_DIALOG_TO_OPEN_IMAGE';
export const SHOW_DIALOG_TO_PICK_SAVE_DIR = 'SHOW_DIALOG_TO_PICK_SAVE_DIR';
export const SHOW_IMAGE_IN_FOLDER = 'SHOW_IMAGE_IN_FOLDER';
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

//------------------------------------------------------------------------------
// Action creators
//------------------------------------------------------------------------------

export function authorizeUploader(uploaderId) {
  return {
    type: AUTHORIZE_UPLOADER,
    args: [uploaderId],
  };
}

export function captureDesktop(optDisplayId) {
  return {
    type: CAPTURE_DESKTOP,
    args: [optDisplayId],
  };
}

export function closeAlert(alertId) {
  return {
    type: CLOSE_ALERT,
    args: [alertId],
  };
}

export function copyImage(filePath) {
  return {
    type: COPY_IMAGE,
    args: [filePath],
  };
}

export function copyText(text) {
  return {
    type: COPY_TEXT,
    args: [text],
  };
}

export function importImageFromClipboard() {
  return {
    type: IMPORT_IMAGE_FROM_CLIPBOARD,
    args: [],
  };
}

export function openDashboard() {
  return {
    type: OPEN_DASHBOARD,
    args: [],
  };
}

export function openImageContextMenu(filePath, publicUrls) {
  return {
    type: OPEN_IMAGE_CONTEXT_MENU,
    args: [filePath, publicUrls],
  };
}

export function openSettings() {
  return {
    type: OPEN_SETTINGS,
    args: [],
  };
}

export function quitApp() {
  return {
    type: QUIT_APP,
    args: [],
  };
}

export function saveImage(filePath, dataURL) {
  return {
    type: SAVE_IMAGE,
    args: [filePath, dataURL],
  };
}

export function showAlert(alert) {
  return {
    type: SHOW_ALERT,
    args: [alert],
  };
}

export function showDialogToOpenImage() {
  return {
    type: SHOW_DIALOG_TO_OPEN_IMAGE,
    args: [],
  };
}

export function showDialogToPickSaveDir() {
  return {
    type: SHOW_DIALOG_TO_PICK_SAVE_DIR,
    args: [],
  };
}

export function showImageInFolder(filePath) {
  return {
    type: SHOW_IMAGE_IN_FOLDER,
    args: [filePath],
  };
}

export function updateSetting(key, value) {
  return {
    type: UPDATE_SETTING,
    args: [key, value],
  };
}

export function uploadImage(filePath, optUploaderId) {
  return {
    type: UPLOAD_IMAGE,
    args: [filePath, optUploaderId],
  };
}


// const types = [
//   'authorizeUploader',
//   'captureDesktop',
//   'captureSelection',
//   'captureWindow',
//   'closeAlert',
//   'copyImage',
//   'copyText',
//   'importImageFromClipboard',
//   'openDashboard',
//   'openImageContextMenu',
//   'openSettings',
//   'quitApp',
//   'saveImage',
//   'showDialogToOpenImage',
//   'showDialogToPickSaveDir',
//   'showImageInFolder',
//   'updateSetting',
//   'uploadImage',
// ];

// const creators = {};

// types.forEach((type) => {
//   creators[type] = function actionCreator(...args) {
//     // Forward arguments to dispatcher as array,
//     // dispatcher will then spread these arguments before calling a handler
//     return { type, args };
//   };
// });

// export default creators;
// export { types as types };
