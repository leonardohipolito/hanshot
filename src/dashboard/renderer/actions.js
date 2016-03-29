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
