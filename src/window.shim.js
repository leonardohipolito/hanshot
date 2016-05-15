//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import EventEmitter from 'events';

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createWindow(namespace, windowOptions) {
  const window = new electron.BrowserWindow(windowOptions);
  const emitter = new EventEmitter();

  const whenLoad = new Promise((resolve) => {
    window.webContents.once('did-finish-load', resolve);
  });

  whenLoad.then(() => {
    emitter.emit('load');
  });

  return {
    load(url) {
      window.loadURL(url);
    },
    show(options = { focus: true }) {
      if (options.focus) {
        window.show();
      } else {
        window.showInactive();
      }
    },
    destroy() {
      window.destroy();
    },

    setPosition(x, y) {
      window.setPosition(x, y);
    },

    on(...args) {
      emitter.on(...args);
    },

    sendMessage(type, body) {
      whenLoad.then(() => {
        window.webContents.send(`window:${namespace}:${type}`, body);
      });
    },

    onMessage(type, callback) {
      // TODO: unsub on destroy
      electron.ipcMain.on(`window:${namespace}:${type}`, callback);
    },
  };
}
