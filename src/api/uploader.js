'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var electron = require('electron');

var uploaders = {
  imgur: require('../uploaders/imgur'),
  dropbox: require('../uploaders/dropbox')
};
var alert = require('../factory/alert');
var notify = require('../notification');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function createUploaderApi(app) {

  return {

    authorize: function (uploaderId) {

      var Uploader = uploaders[uploaderId];
      if (!Uploader) {
        return;
      }

      var uploader = new Uploader(app.cache);
      if (uploader.isAuthorized()) {
        return;
      }

      uploader.authorize();

    },

    upload: function (uploaderId, filePath) {

      if (!uploaderId) {
        uploaderId = app.settings.get('default-uploader');
      }

      var Uploader = uploaders[uploaderId];
      if (!Uploader) {
        return;
      }

      var image = app.gallery.find(filePath);
      if (!image) {
        return;
      }

      var uploader = new Uploader(app.cache);

      if (!uploader.isAuthorized()) {
        // store.dispatch(storeActions.showAlert(
        //   factory.alert.uploaderAuth(uploader.id, uploader.name)
        // ));
        app.windows.dashboard.open();
        return;
      }

      var buffer = null;
      if (app.settings.get('image-format') === 'jpg') {
        buffer = image.toJpgBuffer(app.settings.get('jpg-quality'));
      } else {
        buffer = image.toPngBuffer();
      }

      uploader.upload(image.getFileName(), buffer, function (err, link) {
        if (err) throw err;

        electron.clipboard.writeText(link);

        app.gallery.addPublicUrl(image.getFilePath(), link);

        notify('<b>Screenshot uploaded</b><br>Public URL is in clipboard');

        console.log('Uploaded');
        console.log(link);
      });

    }

  };

};
