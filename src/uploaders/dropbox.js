'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');

var electron = require('electron');
var Dropbox = require('dropbox');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var APP_KEY = 'kpcl06276lsh12t';
var REDIRECT_URI = 'hanshot://uploaders/dropbox/dummy';

function upload(filePath, token, cb) {

  var client = new Dropbox.Client({
    key: APP_KEY,
    token: token
  });

  client.authenticate({ interactive: false }, function (err, client) {
    if (err) throw err;

    fs.readFile(filePath, function (err, buffer) {
      if (err) throw err;

      var fileName = path.basename(filePath);

      // TODO: these two operations take a lot of time
      client.writeFile(fileName, buffer, function (err, response) {
        if (err) throw err;

        client.makeUrl(fileName, function (err, response) {
          if (err) throw err;

          cb(null, response.url);

        });

      });

    });
  });

}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function DropboxUploader(cache) {
  this.cache = cache;
}

DropboxUploader.prototype.upload = function (image, cb) {
  var filePath = image.getFilePath();

  var token = this.cache.get('uploaders.dropbox.token');

  if (token) {

    upload(filePath, token, cb);

  } else {

    this.authorize(function (err, token) {
      if (err) throw err;

      upload(filePath, token, cb);
    });

  }

};

DropboxUploader.prototype.authorize = function (cb) {

  var authUrl = 'https://www.dropbox.com/1/oauth2/authorize?' +
    'response_type=token' +
    '&client_id=kpcl06276lsh12t' +
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

      this.cache.set('uploaders.dropbox.token', token);

      cb(null, token);

    }

  }.bind(this));

  window.loadURL(authUrl);

  window.on('close', function () {
    window = null;
  });

};

module.exports = DropboxUploader;
