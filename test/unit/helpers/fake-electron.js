// Fake "electron" module for unit tests
// Thanks to https://glebbahmutov.com/blog/put-mock-data-into-node-require-cache/

const Module = require('module');
// eslint-disable-next-line no-underscore-dangle
const originalResolve = Module._resolveFilename;

const fakeName = 'electron';

// https://github.com/nodejs/node/blob/v6.x/lib/module.js#L383
// eslint-disable-next-line no-underscore-dangle
Module._resolveFilename = function fakeResolve(request, parent, isMain) {
  if (request === fakeName) {
    return fakeName;
  }
  return originalResolve(request, parent, isMain);
};

require.cache[fakeName] = {
  id: fakeName,
  filename: fakeName,
  loaded: true,
  exports: function fakeExport() {
    // Fake electron export
  },
};
