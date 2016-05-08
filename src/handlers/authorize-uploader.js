//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import imgur from '../uploaders/imgur';
import dropbox from '../uploaders/dropbox';

const uploaders = { imgur, dropbox };

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default {

  inject: ['cache'],

  create(cache) {
    return function authorizeUploaderHandler(uploaderId) {
      const Uploader = uploaders[uploaderId];
      if (!Uploader) {
        return;
      }

      const uploader = new Uploader(cache);
      if (uploader.isAuthorized()) {
        return;
      }

      uploader.authorize();
    };
  },

};
