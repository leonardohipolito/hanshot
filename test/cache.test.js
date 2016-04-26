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

// Notes:
// - make sure to stub fs methods appropriately not to hit real fs

test('cache: read from file path from args', function (assert) {
  var readFileSync = sinon.spy();
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/path');

  assert.deepEqual(readFileSync.args[0], ['/some/path', 'utf8']);
  assert.end();
});

test('cache: no throw if file read fails', function (assert) {
  var readFileSync = sinon.stub().throws();
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var initCache = function initCache() {
    var cache = new Cache('/some/path');
  };

  assert.doesNotThrow(initCache);
  assert.end();
});

test('cache: no throw if file has bad json', function (assert) {
  var readFileSync = sinon.stub().returns('badjson');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var initCache = function initCache() {
    var cache = new Cache('/some/path');
  };

  assert.doesNotThrow(initCache);
  assert.end();
});

test('cache: get existing value', function (assert) {
  var readFileSync = sinon.stub().returns('{"foo":42}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/path');

  assert.equal(cache.get('foo'), 42);
  assert.equal(cache.get('foo', 33), 42, 'with default');
  assert.end();
});

test('cache: get existing deep value', function (assert) {
  var readFileSync = sinon.stub().returns('{"foo":{"bar":{"baz":42}}}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/path');

  assert.equal(cache.get('foo.bar.baz'), 42);
  assert.equal(cache.get('foo.bar.baz', 33), 42, 'with default');
  assert.end();
});

test('cache: get missing value', function (assert) {
  var readFileSync = sinon.stub().returns('{}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/path');

  assert.equal(cache.get('foo'), undefined);
  assert.equal(cache.get('foo', 33), 33, 'with default');
  assert.end();
});

test('cache: set missing value', function (assert) {
  var readFileSync = sinon.stub().returns('{}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/file');
  var previousValue = cache.get('foo');
  var result = cache.set('foo', 42);
  var newValue = cache.get('foo');

  assert.equal(previousValue, undefined, 'previous value');
  assert.equal(newValue, 42, 'new value');
  assert.equal(result, cache, 'returns instance');
  assert.end();
});

test('cache: override existing value', function (assert) {
  var readFileSync = sinon.stub().returns('{"foo":42}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/file');
  var previousValue = cache.get('foo');
  var result = cache.set('foo', 33);
  var newValue = cache.get('foo');

  assert.equal(previousValue, 42, 'previous value');
  assert.equal(newValue, 33, 'new value');
  assert.equal(result, cache, 'returns instance');
  assert.end();
});

test('cache: remove existing value', function (assert) {
  var readFileSync = sinon.stub().returns('{"foo":42}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/file');
  var previousValue = cache.get('foo');
  var result = cache.remove('foo');
  var newValue = cache.get('foo');

  assert.equal(previousValue, 42, 'previous value');
  assert.equal(newValue, undefined, 'new value');
  assert.equal(result, true, 'is removed');
  assert.end();
});

test('cache: remove existing deep value', function (assert) {
  var readFileSync = sinon.stub().returns('{"foo":{"bar":{"baz":42}}}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/path');
  var previousValue = cache.get('foo.bar.baz');
  var result = cache.remove('foo.bar.baz');
  var newValue = cache.get('foo.bar.baz');

  assert.equal(previousValue, 42, 'previous value');
  assert.equal(newValue, undefined, 'new value');
  assert.equal(result, true, 'is removed');
  assert.end();
});

test('cache: remove missing value', function (assert) {
  var readFileSync = sinon.stub().returns('{}');
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync
    }
  });

  var cache = new Cache('/some/path');
  var result = cache.remove('foo');

  assert.equal(result, false, 'is removed');
  assert.end();
});

test('cache: save to file path from args', function (assert) {
  var readFileSync = sinon.spy();
  var writeFileSync = sinon.spy();
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync,
      writeFileSync: writeFileSync
    }
  });

  var cache = new Cache('/some/path');
  var result = cache.save();

  assert.deepEqual(writeFileSync.args[0], ['/some/path', '{}']);
  assert.equal(result, cache, 'returns instance');
  assert.end();
});

test('cache: save failed to read file', function (assert) {
  var readFileSync = sinon.stub().throws();
  var writeFileSync = sinon.spy();
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync,
      writeFileSync: writeFileSync
    },
  });

  var cache = new Cache('/some/path');
  var result = cache.save();

  assert.deepEqual(writeFileSync.args[0], ['/some/path', '{}']);
  assert.equal(result, cache, 'returns instance');
  assert.end();
});

test('cache: save file with bad json', function (assert) {
  var readFileSync = sinon.stub().returns('badjson');
  var writeFileSync = sinon.spy();
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync,
      writeFileSync: writeFileSync
    }
  });

  var cache = new Cache('/some/path');
  var result = cache.save();

  assert.deepEqual(writeFileSync.args[0], ['/some/path', '{}']);
  assert.equal(result, cache, 'returns instance');
  assert.end();
});

test('cache: save modified values', function (assert) {
  var readFileSync = sinon.stub().returns(
    '{"foo":42,"boo":false,"bar":{"baz":"hi"}}'
  );
  var writeFileSync = sinon.spy();
  var Cache = proxyquire('../src/cache', {
    fs: {
      readFileSync: readFileSync,
      writeFileSync: writeFileSync
    }
  });

  var cache = new Cache('/some/path');
  cache.set('foo', 'cat');
  cache.remove('boo');
  cache.set('qux', true);
  cache.set('bar.duck', 'hi');
  cache.remove('bar.baz');
  cache.save();

  // Order of object keys is not guaranteed
  var saveJSON = writeFileSync.args[0][1];
  assert.ok(saveJSON.match(/"foo":"cat"/), 'shallow override');
  assert.notOk(saveJSON.match(/"boo":false/), 'shallow remove');
  assert.ok(saveJSON.match(/"qux":true/), 'shallow set');
  assert.ok(saveJSON.match(/"bar":\{"duck":"hi"\}/), 'deep set');
  assert.notOk(saveJSON.match(/"bar":\{"baz":"hi"\}/), 'deep remove');
  assert.end();
});

