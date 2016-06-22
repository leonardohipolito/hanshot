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
  assert.deepEqual(onAdd.firstCall.args[0], item, 'same data');
  assert.notEqual(onAdd.firstCall.args[0], item, 'no ref');
  assert.equal(collection.size(), 1, 'total size');
  assert.end();
});

test('collection: get first', (assert) => {
  const collection = new Collection();
  const item1 = { id: 42, foo: 'bar' };
  const item2 = { id: 33, baz: 'qux' };

  collection.add(item1);
  collection.add(item2);

  assert.equal(collection.size(), 2, 'total size');
  assert.deepEqual(collection.first(), item1, 'same data');
  assert.notEqual(collection.first(), item1, 'no ref');
  assert.end();
});

test('collection: get last', (assert) => {
  const collection = new Collection();
  const item1 = { id: 42, foo: 'bar' };
  const item2 = { id: 33, baz: 'qux' };

  collection.add(item1);
  collection.add(item2);

  assert.equal(collection.size(), 2, 'total size');
  assert.deepEqual(collection.last(), item2, 'same data');
  assert.notEqual(collection.last(), item2, 'no ref');
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

  assert.deepEqual(found1, item1, 'first same data');
  assert.notEqual(found1, item1, 'first no ref');
  assert.deepEqual(found2, item2, 'second same data');
  assert.notEqual(found2, item2, 'second no ref');
  assert.equal(found3, undefined, 'third missing');
  assert.end();
});

test('collection: get items', (assert) => {
  const collection = new Collection();
  const item1 = { id: 42, foo: 'bar' };
  const item2 = { id: 33, baz: 'qux' };

  collection.add(item1);
  collection.add(item2);

  assert.deepEqual(collection.all(), [item1, item2], 'same data');
  assert.notEqual(collection.all()[0], item1, 'no ref');
  assert.notEqual(collection.all()[1], item2, 'no ref');
  assert.end();
});

test('collection: update by prop', (assert) => {
  const collection = new Collection();
  const item1 = { id: 42, foo: 'bar' };
  const item2 = { id: 33, baz: 'qux' };
  const onUpdate = spy();

  collection.add(item1);
  collection.on('update', onUpdate);
  const found1 = collection.first();
  const size1 = collection.size();
  collection.updateBy('id', 42, item2);
  const found2 = collection.first();
  const size2 = collection.size();

  assert.deepEqual(found1, item1, 'same data');
  assert.notEqual(found1, item1, 'no ref');
  assert.equal(size1, 1);
  assert.deepEqual(found2, item2, 'same data');
  assert.notEqual(found2, item2, 'no ref');
  assert.equal(size2, 1);
  assert.deepEqual(onUpdate.firstCall.args[0], item2, 'same data');
  assert.notEqual(onUpdate.firstCall.args[0], item2, 'no ref');
  assert.end();
});
