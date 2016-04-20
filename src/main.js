'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var cli = require('./cli');
var initApp = require('./app');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var isLinux = (process.platform === 'linux');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// Initialize variables used inside app.on('ready'),
// so they won't be garbage collected when handler executes
var app = null;


// Keep one running instance and prevent second instance from starting
var shouldQuit = electron.app.makeSingleInstance(function (argv, workdir) {
  console.log('There is an already running instance');
  var args = argv.slice(2);

  if (!app) {
    console.log('Unable to use already running instance');
    return;
  }

  if (!args.length) {
    app.perform({ actionName: 'open-dashboard' });
    return;
  }

  var cliAction = cli.parseAction(args);
  app.perform(cliAction);
});

// Kill second process, if one is already running
if (shouldQuit) {
  electron.app.quit();
  return;
}

// ---

process.on('uncaughtException', function (err) {
  electron.dialog.showErrorBox(
    'Uncaught exception, app will now quit',
    err.stack
  );
  console.log('Uncaught exception: ', err);
  console.log(err.stack);
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

electron.app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    electron.app.quit();
  }
});

electron.app.on('ready', function () {

  app = initApp();

  var args = process.argv.slice(2);
  var cliAction = cli.parseAction(args);
  app.perform(cliAction);

  // "printscreen" is not supported yet. FUCK
  // https://github.com/atom/electron/issues/4663
  // var isNowRegistered = electron.globalShortcut.register('ctrl+p', function () {
  //   snapshot();
  // });

  // if (!isNowRegistered) {
  //   console.log('registration failed');
  // }

});
