//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Collection from './collection';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function createGallery(cache) {
  const gallery = new Collection();
  const items = cache.get('gallery', []);
  items.forEach((item) => {
    gallery.add(item);
  });
  return gallery;
}

createGallery.inject = ['cache'];
