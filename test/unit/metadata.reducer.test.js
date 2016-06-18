//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';

import { RECEIVE_METADATA } from '../../src/store/actions';
import metadataReducer from '../../src/store/reducers/metadata.reducer';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('metadata.reducer: initial state', (assert) => {
  const newState = metadataReducer(undefined, {});

  assert.deepEqual(newState, {});
  assert.end();
});

test('metadata.reducer: RECEIVE_METADATA when empty', (assert) => {
  const metadata = { foo: 'bar' };
  const action = {
    type: RECEIVE_METADATA,
    metadata,
  };

  const newState = metadataReducer({}, action);

  assert.deepEqual(newState, { foo: 'bar' });
  assert.notEqual(newState, metadata);
  assert.end();
});

test('metadata.reducer: RECEIVE_METADATA when filled', (assert) => {
  const metadata = { foo: 'bar' };
  const action = {
    type: RECEIVE_METADATA,
    metadata,
  };
  const prevState = { baz: 'qux' };

  const newState = metadataReducer(prevState, action);

  assert.deepEqual(newState, { foo: 'bar' });
  assert.notEqual(newState, metadata);
  assert.end();
});
