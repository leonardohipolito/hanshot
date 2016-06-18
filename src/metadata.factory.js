//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import metadata from './config/metadata';
import { receiveMetadata } from './store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// TODO: rethink metadata, mb make it injectable?
export default function metadataFactory(store) {
  function fetchMetadata() {
    store.dispatch(receiveMetadata(metadata));
  }

  // Update store with metadata when app starts
  fetchMetadata();

  return metadata;
}

metadataFactory.inject = ['store'];
