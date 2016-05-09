//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const path = require('path');

const test = require('tape');
const electron = require('electron');

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const files = [
  'test/integration/clipboard.test',
];

test.createStream().pipe(process.stdout);

files.forEach((file) => {
  // eslint-disable-next-line global-require
  require(path.resolve(file));
});

// Gracefully exit electron process
test.onFinish(() => {
  electron.app.quit();
});

// Catch errors in tests
process.on('uncaughtException', (err) => {
  console.log(err.stack);
  electron.app.quit();
});
