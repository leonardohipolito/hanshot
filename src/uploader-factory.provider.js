//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import ImgurUploader from './uploaders/imgur';
import DropboxUploader from './uploaders/dropbox';

import {
  UPLOADER_IMGUR,
  UPLOADER_DROPBOX,
} from './constants';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const uploaders = {
  [UPLOADER_IMGUR]: ImgurUploader,
  [UPLOADER_DROPBOX]: DropboxUploader,
};

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function uploaderFactoryProvider(settings, cache) {
  return function uploaderFactory(optUploaderId) {
    let uploaderId = optUploaderId;

    if (!(uploaderId in uploaders)) {
      uploaderId = settings.get('default-uploader');
    }

    if (!(uploaderId in uploaders)) {
      uploaderId = UPLOADER_IMGUR;
    }

    const Uploader = uploaders[uploaderId];

    const uploader = new Uploader(cache);

    return uploader;
  };
}

uploaderFactoryProvider.inject = ['settings', 'cache'];
