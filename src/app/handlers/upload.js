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
      uploaderId = components.settings.get('default-uploader');
    }

    var Uploader = uploaders[uploaderId];
    if (!Uploader) {
      return;
    }

    var image = components.gallery.find(action.filePath);
    if (!image) {
      return;
    }

    var uploader = new Uploader(components.cache);

    if (!uploader.isAuthorized()) {
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
