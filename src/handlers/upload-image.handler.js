//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as path from 'path';

import * as fs from '../fs-extra';
import * as clipboard from '../clipboard';
import log from '../log';

import notify from '../notification';
import * as notificationMessages from '../notification/messages';
import * as alertMessages from '../alerts';
import { showAlert, openDashboard } from '../actions';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default function uploadImageHandler(
  dispatch, settings, gallery, uploaderFactory
) {
  return function uploadImage(filePath, optUploaderId) {
    const uploader = uploaderFactory(optUploaderId);

    if (!uploader.isAuthorized()) {
      log('not auth i guess');
      dispatch(showAlert(alertMessages.uploaderAuth(uploader.id, uploader.name)));
      dispatch(openDashboard());
      return;
    }

    const fileName = path.basename(filePath);

    fs.readImage(filePath)
      .then(imageBuffer => uploader.upload(fileName, imageBuffer))
      .then(link => {
        clipboard.writeText(link);

        const imageData = gallery.findBy('filePath', filePath);
        if (imageData) {
          imageData.publicUrls = imageData.publicUrls || [];
          imageData.publicUrls.push(link);
          gallery.updateBy('filePath', filePath, imageData);
        }

        notify(notificationMessages.screenshotUploaded());

        log('uploaded i guess');
        log(link);
      })
      .catch(err => {
        log('UPLOAD READ ERROR');
        log(err);
      });
  };
}

uploadImageHandler.inject = [
  'dispatch', 'settings', 'gallery', 'uploaderFactory',
];
