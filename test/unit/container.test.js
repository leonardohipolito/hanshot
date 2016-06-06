//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { spy } from 'sinon';

import Container from '../../src/container';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('container: register and get value', (assert) => {
  const container = new Container();

  container.registerValue('foo', 42);

  assert.equal(container.get('foo'), 42);
  assert.end();
});

test('container: register multiple values', (assert) => {
  const container = new Container();

  container.registerValues({
    foo: 42,
    bar: true,
  });

  assert.equal(container.get('foo'), 42);
  assert.equal(container.get('bar'), true);
  assert.end();
});

test('container: get undefined value', (assert) => {
  const container = new Container();

  assert.equal(container.get('foo'), undefined);
  assert.end();
});

test('container: override value', (assert) => {
  const container = new Container();

  container.registerValue('foo', 42);
  container.registerValue('foo', 33);

  assert.equal(container.get('foo'), 33);
  assert.end();
});

test('container: register class and get instance', (assert) => {
  const container = new Container();
  const Foo = function Foo() { this.bar = 42; };

  container.registerClass('foo', Foo);
  const foo = container.get('foo');

  assert.ok(foo instanceof Foo);
  assert.equal(foo.bar, 42);
  assert.end();
});

test('container: register multiple classes', (assert) => {
  const container = new Container();
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
  const container = new Container();
  const foo = function foo() { return 42; };

  container.registerFactory('foo', foo);

  assert.equal(container.get('foo'), 42);
  assert.end();
});

test('container: register multiple factories', (assert) => {
  const container = new Container();
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
  const container = new Container();
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

test('container: inject value', (assert) => {
  const container = new Container();
  const Baz = function Baz(foo) { this.foo = foo; };
  Baz.inject = ['foo'];
  const bar = function bar(foo) { return foo; };
  bar.inject = ['foo'];

  container.registerValue('foo', 42);
  container.registerClass('baz', Baz);
  container.registerFactory('bar', bar);

  assert.equal(container.get('foo'), 42);
  assert.equal(container.get('baz').foo, 42);
  assert.equal(container.get('bar'), 42);
  assert.end();
});

test('container: throw when dep not registered', (assert) => {
  const container = new Container();
  const Baz = function Baz(foo) { this.foo = foo; };
  Baz.inject = ['foo'];
  const bar = function bar(foo) { return foo; };
  bar.inject = ['foo'];

  container.registerFactory('bar', bar);
  container.registerClass('baz', Baz);
  const bazGet = function bazGet() {
    container.get('baz');
  };
  const barGet = function barGet() {
    container.get('bar');
  };

  assert.throws(bazGet);
  assert.throws(barGet);
  assert.end();
});

test('container: instantiate', (assert) => {
  const container = new Container();
  const spyBaz = spy();
  const spyBar = spy();

  const Baz = function Baz() { spyBaz(); };
  const bar = function bar() { spyBar(); };

  container.registerClass('baz', Baz);
  container.registerClass('bar', bar);
  const bazBefore = spyBaz.called;
  const barBefore = spyBar.called;
  container.instantiate();

  assert.notOk(bazBefore);
  assert.notOk(barBefore);
  assert.ok(spyBaz.calledOnce);
  assert.ok(spyBar.calledOnce);
  assert.end();
});
