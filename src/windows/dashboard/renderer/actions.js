var electron = electronRequire('electron');

function sendAction(data) {
  electron.ipcRenderer.send('dashboard-action', data);
}

exports.send = function (action) {
  sendAction(action);
};

exports.snapDesktop = function (displayId) {
  sendAction({
    actionName: 'capture-desktop',
    displayId: displayId
  });
};

exports.snapSelection = function (displayId) {
  sendAction({
    actionName: 'capture-selection',
    displayId: displayId
  });
};

exports.snapWindow = function (windowId) {
  sendAction({
    actionName: 'capture-window',
    windowId: windowId
  });
};

exports.upload = function (filePath, uploaderId) {
  sendAction({
    actionName: 'upload',
    filePath: filePath,
    uploaderId: uploaderId
  });
};

exports.copyImage = function (filePath) {
  sendAction({
    actionName: 'copy-image',
    filePath: filePath
  });
};

exports.copyText = function (text) {
  sendAction({
    actionName: 'copy-text',
    text: text
  });
};

exports.closeAlert = function (alertId) {
  sendAction({
    actionName: 'close-alert',
    alertId: alertId
  });
};

exports.contextMenu = function (filePath) {
  sendAction({
    actionName: 'context-menu',
    filePath: filePath
  });
};
