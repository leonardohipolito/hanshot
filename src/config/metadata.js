'use strict';

var metadata = {
  imageFormats: [
    { id: 'jpg', name: 'JPG', extensions: ['jpg', 'jpeg'] },
    { id: 'png', name: 'PNG', extensions: ['png'] }
  ],
  uploadHosts: [
    { id: 'imgur', name: 'Imgur' },
    { id: 'dropbox', name: 'Dropbox' }
  ]
};

module.exports = metadata;
