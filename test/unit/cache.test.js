//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { spy, stub } from 'sinon';

import Cache from '../../src/cache';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('cache: set and get value', (assert) => {
  const cache = new Cache();

  cache.set('foo', 42);

  assert.equal(cache.get('foo'), 42);
  assert.end();
});

test('cache: get default value', (assert) => {
  const cache = new Cache();

  assert.equal(cache.get('foo'), undefined);
  assert.equal(cache.get('foo', 42), 42);
  assert.end();
});

test('cache: load from data source', (assert) => {
  const reader = {
    read: stub().returns({ foo: 42 }),
  };
  const cache = new Cache(reader);

  const valueBeforeLoad = cache.get('foo');
  cache.load();
  const valueAfterLoad = cache.get('foo');

  assert.equal(valueBeforeLoad, undefined);
  assert.equal(valueAfterLoad, 42);
  assert.end();
});

test('cache: save to data source', (assert) => {
  const writer = {
    write: spy(),
  };
  const cache = new Cache(writer);

  cache.set('foo', 42);
  cache.save();

  assert.ok(writer.write.calledOnce);
  assert.deepEqual(writer.write.firstCall.args, [{ foo: 42 }]);
  assert.end();
});

test('cache: proceed with bad source', (assert) => {
  const reader = {
    read: stub().throws(),
  };
  const cache = new Cache(reader);
  const fn = function fn() {
    cache.load();
  };

  assert.doesNotThrow(fn);
  assert.equal(cache.get('foo'), undefined);
  assert.end();
});

test('cache: proceed with write failure', (assert) => {
  const writer = {
    read: stub().returns({ foo: 42 }),
    write: stub().throws(),
  };
  const cache = new Cache(writer);
  const fn = function fn() {
    cache.save();
  };

  cache.load();

  assert.doesNotThrow(fn);
  assert.equal(cache.get('foo'), 42);
  assert.end();
});
