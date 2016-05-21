//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import createContainer from '../../src/container';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('container: register and get value', (assert) => {
  const container = createContainer();

  container.registerValue('foo', 42);

  assert.equal(container.get('foo'), 42);
  assert.end();
});

test('container: register multiple values', (assert) => {
  const container = createContainer();

  container.registerValues({
    foo: 42,
    bar: true,
  });

  assert.equal(container.get('foo'), 42);
  assert.equal(container.get('bar'), true);
  assert.end();
});

test('container: get undefined value', (assert) => {
  const container = createContainer();

  assert.equal(container.get('foo'), undefined);
  assert.end();
});

test('container: override value', (assert) => {
  const container = createContainer();

  container.registerValue('foo', 42);
  container.registerValue('foo', 33);

  assert.equal(container.get('foo'), 33);
  assert.end();
});

test('container: register class and get instance', (assert) => {
  const container = createContainer();
  const Foo = function Foo() { this.bar = 42; };

  container.registerClass('foo', Foo);
  const foo = container.get('foo');

  assert.ok(foo instanceof Foo);
  assert.equal(foo.bar, 42);
  assert.end();
});

test('container: register multiple classes', (assert) => {
  const container = createContainer();
  const Foo = function Foo() { this.bar = 42; };
  const Baz = function Baz() { this.qux = 33; };

  container.registerClasses({
    foo: Foo,
    baz: Baz,
  });
  const foo = container.get('foo');
  const baz = container.get('baz');

  assert.ok(foo instanceof Foo);
  assert.equal(foo.bar, 42);
  assert.ok(baz instanceof Baz);
  assert.equal(baz.qux, 33);
  assert.end();
});

test('container: register factory and get instance', (assert) => {
  const container = createContainer();
  const foo = function foo() { return 42; };

  container.registerFactory('foo', foo);

  assert.equal(container.get('foo'), 42);
  assert.end();
});

test('container: register multiple factories', (assert) => {
  const container = createContainer();
  const foo = function foo() { return 42; };
  const bar = function bar() { return 33; };

  container.registerFactories({
    foo,
    bar,
  });

  assert.equal(container.get('foo'), 42);
  assert.equal(container.get('bar'), 33);
  assert.end();
});

test('container: get multiple values', (assert) => {
  const container = createContainer();
  const Baz = function Baz() { this.baz = 42; };
  const bar = function bar() { return 22; };

  container.registerValue('foo', 33);
  container.registerFactory('bar', bar);
  container.registerClass('baz', Baz);
  container.registerValue('qux', 11);
  const values = container.pick(['bar', 'baz', 'foo']);

  assert.deepEqual(values, [22, new Baz(), 33]);
  assert.end();
});
