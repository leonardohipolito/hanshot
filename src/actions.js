//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const types = [
  'authorizeUploader',
  'captureDesktop',
  'captureSelection',
  'captureWindow',
  'closeAlert',
  'copyImage',
  'copyText',
  'importImageFromClipboard',
  'openDashboard',
  'openImageContextMenu',
  'openSettings',
  'quitApp',
  'saveImage',
  'showDialogToOpenImage',
  'showDialogToPickSaveDir',
  'showImageInFolder',
  'updateSetting',
  'uploadImage',
];

const creators = {};

types.forEach((type) => {
  creators[type] = function actionCreator(...args) {
    // Forward arguments to dispatcher as array,
    // dispatcher will then spread these arguments before calling a handler
    return { type, args };
  };
});

export default creators;
export { types as types };
