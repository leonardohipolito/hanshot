//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as clipboard from '../clipboard';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: ['gallery'],

  create(gallery) {
    return function copyImageHandler(filePath) {
      const image = gallery.findByFilePath(filePath);
      if (image) {
        image.load();
        if (image.isEmpty()) {
          console.log('No image loaded');
        } else {
          clipboard.writeImageBuffer(image.toPngBuffer());
        }
      } else {
        console.log('No image found for copy');
      }
    };
  },

};
