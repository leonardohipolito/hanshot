//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import test from 'tape';
import { spy } from 'sinon';

import { RECEIVE_METADATA } from '../../src/store/actions';
import metadataProvider from '../../src/store/providers/metadata.provider.js';

//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------

test('metadata.provider: ', (assert) => {
  const store = {
    dispatch: spy(),
  };
  const metadata = {
    foo: 42,
  };

  const provide = metadataProvider(store, metadata);
  provide();

  assert.ok(store.dispatch.calledOnce);
  assert.deepEqual(store.dispatch.firstCall.args[0], {
    type: RECEIVE_METADATA,
    metadata,
  });
  assert.end();
});
