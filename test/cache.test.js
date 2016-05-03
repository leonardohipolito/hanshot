//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import Cache from '../src/cache';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('cache: empty if not loaded', (assert) => {
  const cache = new Cache();

  assert.deepEqual(cache.toJSON(), {});
  assert.end();
});

test('cache: the same as reset', (assert) => {
  const cache = new Cache();
  const obj = { foo: 42, bar: { baz: true } };

  const ref = cache.reset(obj);

  assert.deepEqual(cache.toJSON(), obj);
  assert.equal(ref, cache);
  assert.end();
});

test('cache: reset with no value resets cache', (assert) => {
  const cache = new Cache();

  const ref1 = cache.reset({ foo: 42 });
  const json1 = cache.toJSON();
  const ref2 = cache.reset();
  const json2 = cache.toJSON();

  assert.deepEqual(json1, { foo: 42 });
  assert.deepEqual(ref1, cache);
  assert.deepEqual(json2, {});
  assert.deepEqual(ref2, cache);
  assert.end();
});

test('cache: set value', (assert) => {
  const cache = new Cache();

  const ref = cache.set('foo', 42);

  assert.deepEqual(cache.toJSON(), { foo: 42 });
  assert.equal(ref, cache);
  assert.end();
});

test('cache: set deep value', (assert) => {
  const cache = new Cache();

  const ref = cache.set('foo.bar.baz', 42);

  assert.deepEqual(cache.toJSON(), { foo: { bar: { baz: 42 } } });
  assert.equal(ref, cache);
  assert.end();
});

test('cache: update value', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: 33 });
  const ref = cache.set('foo', 42);

  assert.deepEqual(cache.toJSON(), { foo: 42 });
  assert.equal(ref, cache);
  assert.end();
});

test('cache: update deep value', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: { bar: { baz: 33 } } });
  const ref = cache.set('foo.bar.baz', 42);

  assert.deepEqual(cache.toJSON(), { foo: { bar: { baz: 42 } } });
  assert.equal(ref, cache);
  assert.end();
});

test('cache: get value', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: 42 });

  assert.equal(cache.get('foo'), 42);
  assert.end();
});

test('cache: get deep value', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: { bar: { baz: 42 } } });

  assert.equal(cache.get('foo.bar.baz'), 42);
  assert.end();
});

test('cache: get value if present when default passed', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: 42 });

  assert.equal(cache.get('foo', 'default value'), 42);
  assert.end();
});

test('cache: get default if value is missing', (assert) => {
  const cache = new Cache();

  assert.equal(cache.get('foo', 'default value'), 'default value');
  assert.end();
});

test('cache: remove value', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: 42 });
  const wasRemoved = cache.remove('foo');

  assert.deepEqual(cache.toJSON(), {});
  assert.equal(wasRemoved, true);
  assert.end();
});

test('cache: remove deep value', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: { bar: { baz: 42 } } });
  const wasRemoved = cache.remove('foo.bar.baz');

  assert.deepEqual(cache.toJSON(), { foo: { bar: {} } });
  assert.deepEqual(wasRemoved, true);
  assert.end();
});

test('cache: cant remove missing value', (assert) => {
  const cache = new Cache();

  const wasRemoved = cache.remove('foo');

  assert.deepEqual(cache.toJSON(), {});
  assert.deepEqual(wasRemoved, false);
  assert.end();
});

test('cache: cant change values through exported obj', (assert) => {
  const cache = new Cache();

  cache.reset({ foo: 42 });
  const json = cache.toJSON();
  json.bar = 33;

  assert.deepEqual(cache.toJSON(), { foo: 42 });
  assert.deepEqual(json, { foo: 42, bar: 33 });
  assert.end();
});
