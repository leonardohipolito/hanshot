//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Collection from './collection';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function galleryService(cache) {
  const gallery = new Collection();

  cache.on('load', () => {
    // Fill up gallery with cached images
    const items = cache.get('gallery', []);
    items.forEach((item) => {
      gallery.add(item);
    });
  });

  return gallery;
}

galleryService.inject = ['cache'];
