//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import Storage from '../../src/storage';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('storage: empty if not loaded', (assert) => {
  const storage = new Storage();

  assert.deepEqual(storage.toJSON(), {});
  assert.end();
});

test('storage: the same as reset', (assert) => {
  const storage = new Storage();
  const obj = { foo: 42, bar: { baz: true } };

  const ref = storage.reset(obj);

  assert.deepEqual(storage.toJSON(), obj);
  assert.equal(ref, storage);
  assert.end();
});

test('storage: reset with no value resets storage', (assert) => {
  const storage = new Storage();

  const ref1 = storage.reset({ foo: 42 });
  const json1 = storage.toJSON();
  const ref2 = storage.reset();
  const json2 = storage.toJSON();

  assert.deepEqual(json1, { foo: 42 });
  assert.deepEqual(ref1, storage);
  assert.deepEqual(json2, {});
  assert.deepEqual(ref2, storage);
  assert.end();
});

test('storage: set value', (assert) => {
  const storage = new Storage();

  const ref = storage.set('foo', 42);

  assert.deepEqual(storage.toJSON(), { foo: 42 });
  assert.equal(ref, storage);
  assert.end();
});

test('storage: set deep value', (assert) => {
  const storage = new Storage();

  const ref = storage.set('foo.bar.baz', 42);

  assert.deepEqual(storage.toJSON(), { foo: { bar: { baz: 42 } } });
  assert.equal(ref, storage);
  assert.end();
});

test('storage: update value', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: 33 });
  const ref = storage.set('foo', 42);

  assert.deepEqual(storage.toJSON(), { foo: 42 });
  assert.equal(ref, storage);
  assert.end();
});

test('storage: update deep value', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: { bar: { baz: 33 } } });
  const ref = storage.set('foo.bar.baz', 42);

  assert.deepEqual(storage.toJSON(), { foo: { bar: { baz: 42 } } });
  assert.equal(ref, storage);
  assert.end();
});

test('storage: get value', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: 42 });

  assert.equal(storage.get('foo'), 42);
  assert.end();
});

test('storage: get deep value', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: { bar: { baz: 42 } } });

  assert.equal(storage.get('foo.bar.baz'), 42);
  assert.end();
});

test('storage: get value if present when default passed', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: 42 });

  assert.equal(storage.get('foo', 'default value'), 42);
  assert.end();
});

test('storage: get default if value is missing', (assert) => {
  const storage = new Storage();

  assert.equal(storage.get('foo', 'default value'), 'default value');
  assert.end();
});

test('storage: remove value', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: 42 });
  const wasRemoved = storage.remove('foo');

  assert.deepEqual(storage.toJSON(), {});
  assert.equal(wasRemoved, true);
  assert.end();
});

test('storage: remove deep value', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: { bar: { baz: 42 } } });
  const wasRemoved = storage.remove('foo.bar.baz');

  assert.deepEqual(storage.toJSON(), { foo: { bar: {} } });
  assert.deepEqual(wasRemoved, true);
  assert.end();
});

test('storage: cant remove missing value', (assert) => {
  const storage = new Storage();

  const wasRemoved = storage.remove('foo');

  assert.deepEqual(storage.toJSON(), {});
  assert.deepEqual(wasRemoved, false);
  assert.end();
});

test('storage: cant change values through exported obj', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: 42 });
  const json = storage.toJSON();
  json.bar = 33;

  assert.deepEqual(storage.toJSON(), { foo: 42 });
  assert.deepEqual(json, { foo: 42, bar: 33 });
  assert.end();
});

test('storage: has value', (assert) => {
  const storage = new Storage();

  storage.reset({ foo: 42 });

  assert.equal(storage.has('foo'), true);
  assert.end();
});

test('storage: does not have value', (assert) => {
  const storage = new Storage();

  assert.equal(storage.has('foo'), false);
  assert.end();
});
