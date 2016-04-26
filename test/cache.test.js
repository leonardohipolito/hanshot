'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var test = require('tape');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('cache: constructor: should read from file path in args', function (assert) {
  var readFileSync = sinon.spy();
  var Cache = proxyquire('../src/cache', {
    fs: { readFileSync: readFileSync }
  });

  var cache = new Cache('/some/path');

  assert.deepEqual(readFileSync.args[0], ['/some/path', 'utf8']);
  assert.end();
});

test('cache: constructor: should not throw if file does not exist', function (assert) {
  var readFileSync = sinon.stub().throws({ code: 'ENOENT' });
  var Cache = proxyquire('../src/cache', {
    fs: { readFileSync: readFileSync }
  });

  var initCache = function initCache() {
    var cache = new Cache('/some/path');
  };

  assert.doesNotThrow(initCache);
  assert.end();
});

test('cache: constructor: shot throw any other read error', function (assert) {
  var readFileSync = sinon.stub().throws();
  var Cache = proxyquire('../src/cache', {
    fs: { readFileSync: readFileSync }
  });

  var initCache = function initCache() {
    var cache = new Cache('/some/path');
  };

  assert.throws(initCache);
  assert.end();
});
