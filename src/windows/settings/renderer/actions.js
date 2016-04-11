var electron = electronRequire('electron');

function sendAction(data) {
  electron.ipcRenderer.send('settings-action', data);
}

exports.updateSetting = function (key, newValue) {
  sendAction({
    actionName: 'settings-changed',
    key: key,
    value: newValue
  });
};

exports.openDialog = function () {
  sendAction({
    actionName: 'settings-dialog'
  });
};
