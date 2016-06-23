//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import { RECEIVE_SETTINGS, UPDATE_SETTING } from '../../src/store/actions';
import settingsReducer from '../../src/store/reducers/settings.reducer';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('settings.reducer: initial state', (assert) => {
  const nextState = settingsReducer(undefined, {});

  assert.deepEqual(nextState, {});
  assert.end();
});

test('settings.reducer: receive settings when empty', (assert) => {
  const state = {};
  const action = {
    type: RECEIVE_SETTINGS,
    settings: {
      foo: 'bar',
    },
  };

  const nextState = settingsReducer(state, action);

  assert.deepEqual(state, {}, 'no change prev state');
  assert.deepEqual(nextState, { foo: 'bar' }, 'new state');
  assert.end();
});

test('settings.reducer: receive settings when filled', (assert) => {
  const state = { bar: 'qux' };
  const action = {
    type: RECEIVE_SETTINGS,
    settings: {
      foo: 'bar',
    },
  };

  const nextState = settingsReducer(state, action);

  assert.deepEqual(state, { bar: 'qux' }, 'no change prev state');
  assert.deepEqual(nextState, { foo: 'bar' }, 'new state');
  assert.end();
});

test('settings.reducer: update setting when empty', (assert) => {
  const state = {};
  const action = {
    type: UPDATE_SETTING,
    key: 'foo',
    value: 42,
  };

  const nextState = settingsReducer(state, action);

  assert.deepEqual(state, {}, 'no change prev state');
  assert.deepEqual(nextState, { foo: 42 }, 'new state');
  assert.end();
});

test('settings.reducer: update setting when filled', (assert) => {
  const state = { foo: 'bar' };
  const action = {
    type: UPDATE_SETTING,
    key: 'foo',
    value: 42,
  };

  const nextState = settingsReducer(state, action);

  assert.deepEqual(state, { foo: 'bar' }, 'no change prev state');
  assert.deepEqual(nextState, { foo: 42 }, 'new state');
  assert.end();
});
