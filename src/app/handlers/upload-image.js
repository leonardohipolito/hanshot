'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var uploaders = {
  imgur: require('../../uploaders/imgur'),
  dropbox: require('../../uploaders/dropbox')
};
var notify = require('../../notification');
var storeActions = require('../../store/actions');
var alertFactory = require('../../factories/alert');
var notificationFactory = require('../../factories/notification');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function (filePath, uploaderId) {

    if (!uploaderId) {
      console.log('Using default uploader');
      uploaderId = components.settings.get('default-uploader');
    }

    var Uploader = uploaders[uploaderId];
    if (!Uploader) {
      console.log('Uploader not found');
      return;
    }

    var image = components.gallery.findByFilePath(filePath);
    if (!image) {
      console.log('Image not found');
      return;
    }

    var uploader = new Uploader(components.cache);

    if (!uploader.isAuthorized()) {
      console.log('Upload not authorized');
      components.store.dispatch(storeActions.showAlert(
        alertFactory.uploaderAuth(uploader.id, uploader.name)
      ));
      components.windows.dashboard.open();
      return;
    }

    image.load();
    if (image.isEmpty()) {
      console.log('Image is empty');
      return;
    }

    var buffer = null;
    if (components.settings.get('image-format') === 'jpg') {
      buffer = image.toJpgBuffer(components.settings.get('jpg-quality'));
    } else {
      buffer = image.toPngBuffer();
    }

    uploader.upload(image.getFileName(), buffer, function (err, link) {
      if (err) throw err;

      electron.clipboard.writeText(link);

      image.addPublicUrl(link);
      components.gallery.update(image.getFilePath(), image);

      notify(notificationFactory.screenshotUploaded());

      console.log('Uploaded');
      console.log(link);
    });

  };

};
