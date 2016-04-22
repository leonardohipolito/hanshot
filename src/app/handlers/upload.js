'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var uploaders = {
  imgur: require('../../uploaders/imgur'),
  dropbox: require('../../uploaders/dropbox')
};
var alert = require('../../factory/alert');
var notify = require('../../notification');
var storeActions = require('../../store/actions');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  dispatcher.on('uploader-auth', function (action) {

    var Uploader = uploaders[action.uploaderId];
    if (!Uploader) {
      return;
    }

    var uploader = new Uploader(components.cache);
    if (uploader.isAuthorized()) {
      return;
    }

    uploader.authorize();

  });

  dispatcher.on('upload', function (action) {

    var uploaderId = action.uploaderId;

    if (!uploaderId) {
      console.log('Using default uploader');
      uploaderId = components.settings.get('default-uploader');
    }

    var Uploader = uploaders[uploaderId];
    if (!Uploader) {
      console.log('Uploader not found');
      return;
    }

    var image = components.gallery.find(action.filePath);
    if (!image) {
      console.log('Image not found');
      return;
    }

    var uploader = new Uploader(components.cache);

    if (!uploader.isAuthorized()) {
      console.log('Upload not authorized');
      components.store.dispatch(storeActions.showAlert(
        alert.uploaderAuth(uploader.id, uploader.name)
      ));
      components.windows.dashboard.open();
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

      components.gallery.addPublicUrl(image.getFilePath(), link);

      notify('<b>Screenshot uploaded</b><br>Public URL is in clipboard');

      console.log('Uploaded');
      console.log(link);
    });

  });

};
