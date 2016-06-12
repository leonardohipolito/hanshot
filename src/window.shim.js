//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import EventEmitter from 'events';

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class Window {

  constructor(namespace, url, windowOptions) {
    this.namespace = namespace;

    this.emitter = new EventEmitter();

    this.window = new electron.BrowserWindow(windowOptions);

    this.whenLoad = new Promise((resolve) => {
      this.window.webContents.once('did-finish-load', resolve);
    });

    this.whenLoad.then(() => {
      this.emitter.emit('load');
    });

    this.window.on('close', () => {
      this.emitter.emit('close');
    });

    this.window.loadURL(url);
  }

  show(options = { focus: true }) {
    if (options.focus) {
      this.window.show();
    } else {
      this.window.showInactive();
    }
  }

  destroy() {
    this.window.destroy();
    this.emitter.emit('destroy');
  }

  setPosition(x, y) {
    this.window.setPosition(x, y);
  }

  setMenu(template) {
    const menu = electron.Menu.buildFromTemplate(template);
    this.window.setMenu(menu);
  }

  on(...args) {
    this.emitter.on(...args);
  }

  sendMessage(type, body) {
    this.whenLoad.then(() => {
      this.window.webContents.send(`window:${this.namespace}:${type}`, body);
    });
  }

  onMessage(type, callback) {
    // TODO: unsub on destroy
    electron.ipcMain.on(`window:${this.namespace}:${type}`, (event, ...args) => {
      callback(...args);
    });
  }

}
