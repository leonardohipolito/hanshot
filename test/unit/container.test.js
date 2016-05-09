//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import Container from '../../src/container';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('container: register and get single module', (assert) => {
  const container = new Container();
  const module = { foo: 42 };

  container.register('module1', module);

  assert.equal(container.get('module1'), module);
  assert.end();
});

test('container: register multiple modules', (assert) => {
  const container = new Container();
  const module1 = { foo: 42 };
  const module2 = { bar: true };

  container.register({
    module1,
    module2,
  });

  assert.equal(container.get('module1'), module1);
  assert.equal(container.get('module2'), module2);
  assert.end();
});

test('container: get multiple modules as array', (assert) => {
  const container = new Container();
  const module1 = { foo: 42 };
  const module2 = { bar: true };
  const module3 = { baz: 'qux' };

  container.register({
    module1,
    module2,
    module3,
  });
  const modules = container.get(['module3', 'module1', 'module2']);

  assert.deepEqual(modules, [module3, module1, module2]);
  assert.end();
});
