var electron = electronRequire('electron');

exports.snapDesktop = function (displayId) {
  electron.ipcRenderer.send('snapshot-requested', {
    type: 'desktop',
    displayId: displayId
  });
};

exports.snapSelection = function (displayId) {
  electron.ipcRenderer.send('snapshot-requested', {
    type: 'selection',
    displayId: displayId
  });
};

exports.snapWindow = function (windowId) {
  electron.ipcRenderer.send('snapshot-requested', {
    type: 'window',
    windowId: windowId
  });
};

exports.upload = function (filePath, uploaderId) {
  electron.ipcRenderer.send('upload-requested', {
    filePath: filePath,
    uploaderId: uploaderId
  });
};

exports.copy = function (filePath, copyId) {
  electron.ipcRenderer.send('copy-requested', {
    filePath: filePath,
    copyId: copyId
  });
};
