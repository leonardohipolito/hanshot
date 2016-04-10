'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var url = require('url');
var https = require('https');
var querystring = require('querystring');

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var IMGUR_CLIENT_ID = 'ec218ef2f89d0d0';

var IMGUR_UPLOAD_ENDPOINT = 'https://api.imgur.com/3/image';

// Has daily limit for uploads https://api.imgur.com/#limits
var IMGUR_CLIENT_LIMIT = 1250;
var IMGUR_USER_LIMIT = 500;

  // Has size limit 10MB https://api.imgur.com/endpoints/image#image-upload
var IMGUR_SIZE_LIMIT = 10;

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function ImgurUploader(cache) {
  this.cache = cache;
}

// https://api.imgur.com/endpoints/image#image-upload
ImgurUploader.prototype.upload = function (image, options, callback) {
  callback = callback || function () {};

  var urlObj = url.parse(IMGUR_UPLOAD_ENDPOINT);

  var requestData = querystring.stringify({
    image: image.toBase64(),
    type: 'base64'
  });

  var requestOptions = {
    host: urlObj.host,
    path: urlObj.path,
    method: 'POST',
    headers: {
      'Authorization': 'Client-ID ' + IMGUR_CLIENT_ID,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(requestData)
    }
  };

  var req = https.request(requestOptions, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      var json = JSON.parse(body);

      if (json.success) {

        callback(null, json.data.link);

      } else {
        // handle error
      }

    });
  });

  req.on('error', function (err) {
    // handle error
  });

  req.write(requestData);
  req.end();
};

module.exports = ImgurUploader;
