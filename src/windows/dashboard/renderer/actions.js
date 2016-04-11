var electron = electronRequire('electron');

function sendAction(data) {
  electron.ipcRenderer.send('dashboard-action', data);
}

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

exports.copy = function (filePath, copyId) {
  sendAction({
    actionName: 'copy',
    filePath: filePath,
    copyId: copyId
  });
};
