'use strict';

var config = {

  // Uploaders

  // Imgur
  IMGUR_UPLOAD_ENDPOINT: 'https://api.imgur.com/3/image.json',
  IMGUR_CLIENT_ID: 'ec218ef2f89d0d0',
  // Has daily limit for uploads https://api.imgur.com/#limits
  IMGUR_CLIENT_LIMIT: 1250,
  IMGUR_USER_LIMIT: 500,
  // Has size limit 10MB https://api.imgur.com/endpoints/image#image-upload
  IMGUR_SIZE_LIMIT: 10,
};

module.exports = config;
