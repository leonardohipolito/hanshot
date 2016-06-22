//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as url from 'url';
import * as https from 'https';
import * as querystring from 'querystring';

import Window from '../window.shim';
import log from '../log';

// TODO: decide what to do with unit tests electron runtime
// var electron = require('electron');

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const DROPBOX_APP_KEY = 'kpcl06276lsh12t';

const DROPBOX_UPLOAD_ENDPOINT = 'https://content.dropboxapi.com/2/files/upload';
const DROPBOX_SHARE_ENDPOINT = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';

// Has size limit 150MB https://www.dropbox.com/developers/documentation/http/documentation#files-upload
// const DROPBOX_SIZE_LIMIT = 150;

const REDIRECT_URI = 'hanshot://uploaders/dropbox/dummy';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class DropboxUploader {

  constructor(cache) {
    this.id = 'dropbox';
    this.name = 'Dropbox';

    this.cache = cache;
  }

  isAuthorized() {
    return !!this.cache.get('uploaders.dropbox.token');
  }

  upload(fileName, buffer) {
    return new Promise((resolve, reject) => {
      if (!this.isAuthorized()) {
        reject('Requires authorization');
        return;
      }

      const token = this.cache.get('uploaders.dropbox.token');

      this.authorizedUpload(fileName, buffer, token)
        .then(() => this.authrorizedShare(fileName, token))
        .then(link => resolve(link))
        .catch(err => reject(err));
    });
  }

  authorize() {
    return new Promise((resolve, reject) => {
      const authUrl = 'https://www.dropbox.com/1/oauth2/authorize?' +
        'response_type=token' +
        `&client_id=${DROPBOX_APP_KEY}` +
        `&redirect_uri=${REDIRECT_URI}`;

      const window = new Window('dropbox', authUrl, {
        webPreferences: {
          nodeIntegration: false,
        },
      });

      window.on('redirect', (oldUrl, newUrl) => {
        const urlObj = url.parse(newUrl);
        const hash = urlObj.hash;
        // Cut leading '#'
        const hashQueryString = hash.substr(1, hash.length - 1);
        const queryStringObj = querystring.parse(hashQueryString);

        if (queryStringObj.error) {
          reject(queryStringObj.error);
          window.destroy();
          return;
        }

        const token = queryStringObj.access_token;
        this.cache.set('uploaders.dropbox.token', token);

        log(token);

        resolve();
        window.destroy();
      });
    });
  }

  authorizedUpload(fileName, buffer, token) {
    return new Promise((resolve, reject) => {
      const urlObj = url.parse(DROPBOX_UPLOAD_ENDPOINT);

      const requestData = buffer;

      const requestOptions = {
        host: urlObj.host,
        path: urlObj.path,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Dropbox-API-Arg': `{"path":"/${fileName}"}`,
          'Content-Type': 'application/octet-stream',
          'Content-Length': requestData.length,
        },
      };

      const req = https.request(requestOptions, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 200) {
            const json = JSON.parse(body);
            resolve(json);
          } else {
            reject(body);
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(requestData);
      req.end();
    });
  }

  authrorizedShare(fileName, token) {
    return new Promise((resolve, reject) => {
      const urlObj = url.parse(DROPBOX_SHARE_ENDPOINT);

      const requestData = JSON.stringify({
        path: `/${fileName}`,
      });

      const requestOptions = {
        host: urlObj.host,
        path: urlObj.path,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const req = https.request(requestOptions, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 200) {
            const json = JSON.parse(body);
            resolve(json.url);
          } else {
            reject(body);
          }
        });
      });

      req.on('error', err => reject(err));

      req.write(requestData);
      req.end();
    });
  }

}

module.exports = DropboxUploader;
