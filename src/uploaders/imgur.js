'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var url = require('url');
var https = require('https');
var querystring = require('querystring');

var config = require('../config');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function ImgurUploader(cache) {
  this.cache = cache;
}

// https://api.imgur.com/endpoints/image#image-upload
ImgurUploader.prototype.upload = function (image, callback) {

  var urlObj = url.parse(config.IMGUR_UPLOAD_ENDPOINT);

  var data = querystring.stringify({
    image: image.toBase64(),
    type: 'base64'
  });

  var options = {
    host: urlObj.host,
    path: urlObj.path,
    method: 'POST',
    headers: {
      'Authorization': 'Client-ID ' + config.IMGUR_CLIENT_ID,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var req = https.request(options, function (res) {
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

  req.write(data);
  req.end();
};

module.exports = ImgurUploader;
