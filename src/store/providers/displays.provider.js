//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveDisplays } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function displaysProvider(store, screen) {
  function fetchDisplays() {
    return receiveDisplays(screen.getDisplayList());
  }

  screen.on('display-added', () => {
    store.dispatch(fetchDisplays());
  });

  screen.on('display-removed', () => {
    store.dispatch(fetchDisplays());
  });

  screen.on('display-updated', () => {
    store.dispatch(fetchDisplays());
  });

  return fetchDisplays;
}

displaysProvider.inject = ['store', 'screen'];
