//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import { SHOW_ALERT, CLOSE_ALERT } from '../../src/store/actions';
import alertsReducer from '../../src/store/reducers/alerts.reducer';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('alerts.reducer: initial state', (assert) => {
  const newState = alertsReducer(undefined, {});

  assert.deepEqual(newState, []);
  assert.end();
});

test('alerts.reducer: SHOW_ALERT when empty', (assert) => {
  const alert = { id: 42, foo: 'bar' };
  const action = {
    type: SHOW_ALERT,
    alert,
  };

  const newState = alertsReducer([], action);

  assert.deepEqual(newState, [{ id: 42, foo: 'bar' }], 'same data');
  assert.notEqual(newState[0], alert, 'return copy');
  assert.end();
});

test('alerts.reducer: SHOW_ALERT when filled', (assert) => {
  const alert = { id: 42, foo: 'bar' };
  const action = {
    type: SHOW_ALERT,
    alert,
  };
  const prevState = [{ id: 33, baz: 'qux' }];

  const newState = alertsReducer(prevState, action);

  assert.deepEqual(
    newState,
    [{ id: 42, foo: 'bar' }, { id: 33, baz: 'qux' }],
    'same data'
  );
  assert.notEqual(newState[0], alert, 'return copy');
  assert.end();
});

test('alerts.reducer: SHOW_ALERT ignore existing id', (assert) => {
  const alert = { id: 42, foo: 'bar' };
  const action = {
    type: SHOW_ALERT,
    alert,
  };
  const prevState = [{ id: 42, baz: 'qux' }];

  const newState = alertsReducer(prevState, action);

  assert.deepEqual(newState, [{ id: 42, baz: 'qux' }], 'same data');
  assert.end();
});

test('alerts.reducer: CLOSE_ALERT remove by id', (assert) => {
  const action = {
    type: CLOSE_ALERT,
    alertId: 42,
  };
  const prevState = [{ id: 42, bar: 'baz' }];

  const newState = alertsReducer(prevState, action);

  assert.deepEqual(newState, [], 'same data');
  assert.end();
});
