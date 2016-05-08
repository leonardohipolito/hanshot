//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import electron from 'electron';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: ['gallery'],

  create(gallery) {
    return function copyImageHandler(filePath) {
      const image = gallery.findByFilePath(filePath);
      if (image) {
        electron.clipboard.writeImage(image.load().getNative());
      } else {
        console.log('No image found for copy');
      }
    };
  },

};
