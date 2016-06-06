//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { spy } from 'sinon';

import Dispatcher from '../../src/dispatcher';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('dispatcher: no args', (assert) => {
  const dispatcher = new Dispatcher();
  const handler = spy();
  const action = { type: 'type1' };

  dispatcher.on('type1', handler);
  dispatcher.dispatch(action);

  assert.ok(handler.calledOnce);
  assert.deepEqual(handler.firstCall.args, []);
  assert.end();
});

test('dispatcher: single type, single handler', (assert) => {
  const dispatcher = new Dispatcher();
  const handler = spy();
  const action1 = { type: 'type1', args: ['foo', 42] };
  const action2 = { type: 'type1', args: ['bar', true] };

  dispatcher.on('type1', handler);
  dispatcher.dispatch(action1);
  dispatcher.dispatch(action2);

  assert.ok(handler.calledTwice);
  assert.deepEqual(handler.firstCall.args, ['foo', 42]);
  assert.deepEqual(handler.secondCall.args, ['bar', true]);
  assert.end();
});

test('dispatcher: single type, multiple handlers', (assert) => {
  const dispatcher = new Dispatcher();
  const handler1 = spy();
  const handler2 = spy();
  const action1 = { type: 'type1', args: ['foo', 42] };
  const action2 = { type: 'type1', args: ['bar', true] };

  dispatcher.on('type1', handler1);
  dispatcher.on('type1', handler2);
  dispatcher.dispatch(action1);
  dispatcher.dispatch(action2);

  assert.ok(handler1.calledTwice);
  assert.ok(handler2.calledTwice);
  assert.deepEqual(handler1.firstCall.args, ['foo', 42]);
  assert.deepEqual(handler1.secondCall.args, ['bar', true]);
  assert.deepEqual(handler2.firstCall.args, ['foo', 42]);
  assert.deepEqual(handler2.secondCall.args, ['bar', true]);
  assert.end();
});

test('dispatcher: multiple types, one handler', (assert) => {
  const dispatcher = new Dispatcher();
  const handler = spy();
  const action1 = { type: 'type1', args: ['foo', 42] };
  const action2 = { type: 'type2', args: ['bar', true] };

  dispatcher.on('type1', handler);
  dispatcher.on('type2', handler);
  dispatcher.dispatch(action1);
  dispatcher.dispatch(action2);

  assert.ok(handler.calledTwice);
  assert.deepEqual(handler.firstCall.args, ['foo', 42]);
  assert.deepEqual(handler.secondCall.args, ['bar', true]);
  assert.end();
});
