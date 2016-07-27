//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveMetadata } from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function metadataProvider(store, metadata) {
  function provideMetadata() {
    store.dispatch(receiveMetadata(metadata));
  }

  // TODO: move call out of here
  provideMetadata();

  return provideMetadata;
}

metadataProvider.inject = ['store', 'metadata'];
