//------------------------------------------------------------------------------
// Action types
//------------------------------------------------------------------------------

export const CAPTURE_DESKTOP = 'CAPTURE_DESKTOP';
export const OPEN_DASHBOARD = 'OPEN_DASHBOARD';
export const QUIT_APP = 'QUIT_APP';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const IMPORT_IMAGE_FROM_CLIPBOARD = 'IMPORT_IMAGE_FROM_CLIPBOARD';

//------------------------------------------------------------------------------
// Action creators
//------------------------------------------------------------------------------

export function captureDesktop(displayId) {
  return {
    type: CAPTURE_DESKTOP,
    args: [displayId],
  };
}

export function openDashboard() {
  return {
    type: OPEN_DASHBOARD,
    args: [],
  };
}

export function quitApp() {
  return {
    type: QUIT_APP,
    args: [],
  };
}

export function saveImage(type, dataURL) {
  return {
    type: SAVE_IMAGE,
    args: [type, dataURL],
  };
}

export function importImageFromClipboard() {
  return {
    type: IMPORT_IMAGE_FROM_CLIPBOARD,
    args: [],
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
