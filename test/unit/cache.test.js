//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { spy, stub } from 'sinon';

import createCache from '../../src/cache';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('cache: set and get value', (assert) => {
  const cache = createCache();

  cache.set('foo', 42);

  assert.equal(cache.get('foo'), 42);
  assert.end();
});

test('cache: get default value', (assert) => {
  const cache = createCache();

  assert.equal(cache.get('foo'), undefined);
  assert.equal(cache.get('foo', 42), 42);
  assert.end();
});

test('cache: load from data source', (assert) => {
  const reader = {
    read: stub().returns({ foo: 42 }),
  };
  const cache = createCache(reader);

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
  const cache = createCache(writer);

  cache.set('foo', 42);
  cache.save();

  assert.ok(writer.write.calledOnce);
  assert.deepEqual(writer.write.firstCall.args, [{ foo: 42 }]);
  assert.end();
});
