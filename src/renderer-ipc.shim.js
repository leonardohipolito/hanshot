//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class RendererIpc {

  constructor(namespace) {
    this.namespace = namespace;
  }

  getEventName(type) {
    return `window:${this.namespace}:${type}`;
  }

  sendMessage(type, ...args) {
    electron.ipcRenderer.send(this.getEventName(type), ...args);
  }

  onMessage(type, callback) {
    const eventName = this.getEventName(type);
    const listener = function listener(event, ...args) {
      callback(...args);
    };
    electron.ipcRenderer.on(eventName, listener);
  }

  offMessage(type, callback) {
    electron.ipcRenderer.removeListener(this.getEventName(type), callback);
  }

}
