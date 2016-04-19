'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var url = require('url');
var https = require('https');
var querystring = require('querystring');

var electron = require('electron');
var _ = require('lodash');

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

var DROPBOX_APP_KEY = 'kpcl06276lsh12t';

var DROPBOX_UPLOAD_ENDPOINT = 'https://content.dropboxapi.com/2/files/upload';
var DROPBOX_SHARE_ENDPOINT = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';

// Has size limit 150MB https://www.dropbox.com/developers/documentation/http/documentation#files-upload
var DROPBOX_SIZE_LIMIT = 150;

var REDIRECT_URI = 'hanshot://uploaders/dropbox/dummy';

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

function upload(fileName, buffer, token, callback) {
  var urlObj = url.parse(DROPBOX_UPLOAD_ENDPOINT);

  var requestData = buffer;

  var requestOptions = {
    host: urlObj.host,
    path: urlObj.path,
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Dropbox-API-Arg': '{"path":"/' + fileName + '"}',
      'Content-Type': 'application/octet-stream',
      'Content-Length': requestData.length
    }
  };

  var req = https.request(requestOptions, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      if (res.statusCode === 200) {
        var json = JSON.parse(body);
        callback(null);
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
}

function share(fileName, buffer, token, callback) {
  callback = callback || function () {};

  var urlObj = url.parse(DROPBOX_SHARE_ENDPOINT);

  var requestData = JSON.stringify({
    path: '/' + fileName
  });

  var requestOptions = {
    host: urlObj.host,
    path: urlObj.path,
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  };

  var req = https.request(requestOptions, function (res) {
    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {

      if (res.statusCode === 200) {

        var json = JSON.parse(body);

        callback(null, json.url);

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
}

function authorize(callback) {
  callback = callback || function () {};

  var authUrl = 'https://www.dropbox.com/1/oauth2/authorize?' +
    'response_type=token' +
    '&client_id=' + DROPBOX_APP_KEY +
    '&redirect_uri=' + REDIRECT_URI;

  var window = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    }
  });

  window.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    var urlObj = url.parse(newUrl);

    var hash = urlObj.hash;
    var hashQueryString = hash.substr(1, hash.length - 1); // cut leading '#'

    var queryStringObj = querystring.parse(hashQueryString);

    if (queryStringObj.error) {

      console.log('Error: ');
      console.log(queryStringObj.error);
      console.log(queryStringObj.error_description);

      cb(queryStringObj);

      window.close();

    } else {

      var token = queryStringObj.access_token;

      callback(null, token);

      window.close();

    }

  });

  window.loadURL(authUrl);

  window.on('close', function () {
    window = null;
  });
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function DropboxUploader(cache) {
  this.id = 'dropbox';
  this.name = 'Dropbox';

  this.cache = cache;
}

DropboxUploader.prototype.isAuthorized = function () {
  return !!this.cache.get('uploaders.dropbox.token');
};

DropboxUploader.prototype.upload = function (fileName, buffer, callback) {
  callback = callback || function () {};

  if (!this.isAuthorized()) {
    throw new Error('Requires authorization');
  }

  var token = this.cache.get('uploaders.dropbox.token');

  upload(fileName, buffer, token, function (err) {
    if (err) throw err;
    share(fileName, buffer, token, function (err, link) {
      if (err) throw err;
      callback(null, link);
    });
  });

}

DropboxUploader.prototype.authorize = function () {
  var self = this;
  authorize(function (err, token) {
    if (err) throw err;
    self.cache.set('uploaders.dropbox.token', token);
  });
};

module.exports = DropboxUploader;
