//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import { RECEIVE_IMAGE } from '../../src/store/actions';
import imageReducer from '../../src/store/reducers/image.reducer';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('image.reducer: initial state', (assert) => {
  const newState = imageReducer(undefined, {});

  assert.deepEqual(newState, {});
  assert.end();
});

test('image.reducer: RECEIVE_IMAGE when empty', (assert) => {
  const image = { foo: 'bar' };
  const action = {
    type: RECEIVE_IMAGE,
    image,
  };

  const newState = imageReducer({}, action);

  assert.deepEqual(newState, { foo: 'bar' });
  assert.notEqual(newState, image, 'return copy');
  assert.end();
});

test('image.reducer: RECEIVE_IMAGE when filled', (assert) => {
  const image = { foo: 'bar' };
  const action = {
    type: RECEIVE_IMAGE,
    image,
  };
  const prevState = { baz: 'qux' };

  const newState = imageReducer(prevState, action);

  assert.deepEqual(newState, { foo: 'bar' });
  assert.notEqual(newState, image, 'return copy');
  assert.end();
});

test('image.reducer: RECEIVE_IMAGE null value', (assert) => {
  const image = null;
  const action = {
    type: RECEIVE_IMAGE,
    image,
  };

  const newState = imageReducer({}, action);

  assert.deepEqual(newState, null);
  assert.end();
});
