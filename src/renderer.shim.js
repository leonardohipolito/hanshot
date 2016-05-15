//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export function createIpc(namespace) {
  return {

    onMessage(type, callback) {
      electron.ipcRenderer.on(`window:${namespace}:${type}`, callback);
    },

    sendMessage(type, body) {
      electron.ipcRenderer.send(`window:${namespace}:${type}`, body);
    },

  };
}
