//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveDisplays } from '../store/actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function displaysProvider(store, screen) {
  function provideDisplays() {
    store.dispatch(receiveDisplays(screen.getDisplayList()));
  }

  // TODO: move listeners out of here
  screen.on('display-added', provideDisplays);
  screen.on('display-removed', provideDisplays);
  screen.on('display-updated', provideDisplays);

  return provideDisplays;
}

displaysProvider.inject = ['store', 'screen'];
