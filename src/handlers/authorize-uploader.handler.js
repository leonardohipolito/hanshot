//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import log from '../log';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function authorizeUploaderHandler(uploaderFactory) {
  return function authorizeUploader(uploaderId) {
    const uploader = uploaderFactory(uploaderId);
    if (uploader.isAuthorized()) {
      log('already auth i guess');
      return;
    }

    uploader
      .authorize()
      .then(() => {
        log('authorized i guess');
      })
      .catch((err) => {
        log('auth error');
        log(err);
      });
  };
}

authorizeUploaderHandler.inject = ['uploaderFactory'];
