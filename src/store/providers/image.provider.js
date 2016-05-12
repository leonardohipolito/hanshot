//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { receiveImage } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function imageProvider(store, gallery) {
  function fetchImage() {
    // TODO: refactor image to get rid of null and conditions
    const image = gallery.getLast();
    if (image) {
      return receiveImage(image.load());
    }
    return receiveImage(null);
  }

  gallery.on('added', () => {
    store.dispatch(fetchImage());
  });

  gallery.on('updated', () => {
    store.dispatch(fetchImage());
  });

  return fetchImage;
}

imageProvider.inject = ['store', 'gallery'];
