//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

import App from './app';
import * as cli from './cli';
import log from './log';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const isLinux = (process.platform === 'linux');
const isMac = (process.platform === 'darwin');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Keep reference to prevent garbage collection
let app = null;


// Keep one running instance and prevent second instance from starting
const shouldQuit = electron.app.makeSingleInstance((argv) => {
  log('There is an already running instance');
  const args = argv.slice(2);

  if (!app) {
    log('Unable to use already running instance');
    return;
  }

  const cliAction = cli.parseAction(args, true);
  if (cliAction) {
    app.dispatch(cliAction);
  }
});

// Kill second process, if one is already running
if (shouldQuit) {
  electron.app.quit();
  process.exit(0);
}

// ---

process.on('uncaughtException', (err) => {
  electron.dialog.showErrorBox(
    'Uncaught exception, app will now quit',
    err.stack
  );
  log('Uncaught exception: ', err);
  log(err.stack);
  electron.app.quit();
});

// ---

if (isLinux) {
  // http://electron.atom.io/docs/v0.36.8/api/frameless-window/#limitations
  // Alpha channel doesn’t work on some NVidia drivers on Linux
  electron.app.commandLine.appendSwitch('enable-transparent-visuals');
  electron.app.commandLine.appendSwitch('disable-gpu');
}

// ---

electron.app.on('window-all-closed', () => {
  if (!isMac) {
    electron.app.quit();
  }
});

electron.app.on('ready', () => {
  app = new App();
  app.start();

  const args = process.argv.slice(2);
  const cliAction = cli.parseAction(args);
  if (cliAction) {
    app.dispatch(cliAction);
  }

  // "printscreen" is not supported yet. FUCK
  // https://github.com/atom/electron/issues/4663
  // var isNowRegistered = electron.globalShortcut.register('ctrl+p', function () {
  //   snapshot();
  // });

  // if (!isNowRegistered) {
  //   console.log('registration failed');
  // }
});
