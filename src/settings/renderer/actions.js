var electron = electronRequire('electron');

exports.updateSetting = function (key, newValue) {
  electron.ipcRenderer.send('settings-changed', {
    key: key,
    value: newValue
  });
};

exports.openDialog = function () {
  electron.ipcRenderer.send('settings-dialog');
};
