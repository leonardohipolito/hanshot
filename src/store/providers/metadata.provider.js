//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveMetadata } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function metadataProvider(store, metadata) {
  function fetchMetadata() {
    return receiveMetadata(metadata);
  }

  return fetchMetadata;
}

metadataProvider.inject = ['store', 'metadata'];
