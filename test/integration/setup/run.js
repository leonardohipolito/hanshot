//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const spawn = require('child_process').spawn;
const electronPath = require('electron-prebuilt');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

const electron = spawn(electronPath, [
  '-r',
  'babel-register',
  `${__dirname}/suite.js`,
]);

electron.stdout.on('data', (data) => {
  console.log(`${data}`);
});

electron.stderr.on('data', (data) => {
  console.log(`${data}`);
});
