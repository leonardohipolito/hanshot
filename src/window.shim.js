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
    this.webContents = this.window.webContents;

    this.whenLoad = new Promise((resolve) => {
      this.webContents.once('did-finish-load', resolve);
    });

    this.whenLoad.then(() => {
      this.emitter.emit('load');
    });

    this.window.on('close', () => {
      this.emitter.emit('close');
    });

    this.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      this.emitter.emit('redirect', oldUrl, newUrl);
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

  hide() {
    this.window.hide();
  }

  close() {
    this.window.close();
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

  fullscreen() {
    this.window.setFullScreen(true);
  }

  on(...args) {
    this.emitter.on(...args);
  }

  sendMessage(type, body) {
    this.whenLoad.then(() => {
      this.webContents.send(`window:${this.namespace}:${type}`, body);
    });
  }

  onMessage(type, callback) {
    const eventName = `window:${this.namespace}:${type}`;
    const listener = function listener(event, ...args) {
      callback(...args);
    };
    electron.ipcMain.on(eventName, listener);
    this.on('close', () => {
      electron.ipcMain.removeListener(eventName, listener);
    });
  }

  onceMessage(type, callback) {
    const eventName = `window:${this.namespace}:${type}`;
    const listener = function listener(event, ...args) {
      callback(...args);
    };
    electron.ipcMain.once(eventName, listener);
    this.on('close', () => {
      electron.ipcMain.removeListener(eventName, listener);
    });
  }

}
