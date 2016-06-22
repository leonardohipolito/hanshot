//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// import * as clipboard from '../clipboard';


// var notify = require('../../notification');
// var storeActions = require('../../store/actions');
// var alertFactory = require('../../factories/alert');
// var notificationFactory = require('../../factories/notification');

import log from '../log';
import * as fs from '../fs';
import * as path from 'path';
import * as clipboard from '../clipboard';
import { showAlert, openDashboard } from '../actions';
import * as alerts from '../alerts';

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
      dispatch(showAlert(alerts.uploaderAuth(uploader.id, uploader.name)));
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

//       notify(notificationFactory.screenshotUploaded());

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
