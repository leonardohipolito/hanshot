//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { spy } from 'sinon';

import Collection from '../../src/collection';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('collection: empty', (assert) => {
  const collection = new Collection();

  assert.equal(collection.size(), 0);
  assert.equal(collection.first(), undefined);
  assert.equal(collection.last(), undefined);
  assert.end();
});

test('collection: add', (assert) => {
  const collection = new Collection();
  const item = { id: 42, foo: 'bar' };
  const onAdd = spy();

  collection.on('add', onAdd);
  collection.add(item);

  assert.ok(onAdd.calledOnce, 'called once');
  assert.deepEqual(onAdd.firstCall.args, [item]);
  assert.equal(collection.size(), 1);
  assert.end();
});

test('collection: get first', (assert) => {
  const collection = new Collection();
  const item1 = { id: 42, foo: 'bar' };
  const item2 = { id: 33, baz: 'qux' };

  collection.add(item1);
  collection.add(item2);

  assert.equal(collection.size(), 2);
  assert.deepEqual(collection.first(), item1);
  assert.end();
});

test('collection: get last', (assert) => {
  const collection = new Collection();
  const item1 = { id: 42, foo: 'bar' };
  const item2 = { id: 33, baz: 'qux' };

  collection.add(item1);
  collection.add(item2);

  assert.equal(collection.size(), 2);
  assert.deepEqual(collection.last(), item2);
  assert.end();
});

test('collection: find by prop', (assert) => {
  const collection = new Collection();
  const item1 = { id: 42, foo: 'bar' };
  const item2 = { id: 33, baz: 'qux' };

  collection.add(item1);
  collection.add(item2);
  const found1 = collection.findBy('id', 42);
  const found2 = collection.findBy('baz', 'qux');
  const found3 = collection.findBy('id', 10);

  assert.deepEqual(found1, item1);
  assert.deepEqual(found2, item2);
  assert.equal(found3, undefined);
  assert.end();
});
