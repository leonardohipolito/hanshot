//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import * as url from 'url';
import * as https from 'https';
import * as querystring from 'querystring';

import log from '../log';

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const IMGUR_CLIENT_ID = 'ec218ef2f89d0d0';

const IMGUR_UPLOAD_ENDPOINT = 'https://api.imgur.com/3/image';

// Has daily limit for uploads https://api.imgur.com/#limits
// const IMGUR_CLIENT_LIMIT = 1250;
// const IMGUR_USER_LIMIT = 500;

// Has size limit 10MB https://api.imgur.com/endpoints/image#image-upload
// const IMGUR_SIZE_LIMIT = 10;

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

export default class ImgurUploader {

  constructor(cache) {
    this.id = 'imgur';
    this.name = 'Imgur';

    this.cache = cache;
  }

  isAuthorized() {
    return true;
  }

  // https://api.imgur.com/endpoints/image#image-upload
  upload(fileName, buffer) {
    const urlObj = url.parse(IMGUR_UPLOAD_ENDPOINT);

    const requestData = querystring.stringify({
      image: buffer.toString('base64'),
      type: 'base64',
    });

    const requestOptions = {
      host: urlObj.host,
      path: urlObj.path,
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(requestData),
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          const json = JSON.parse(body);

          if (json.success) {
            resolve(json.data.link);
          } else {
            log('imgur error');
            log(json);
            reject(json);
          }
        });
      });

      req.on('error', (err) => {
        log('request error');
        log(err);
        reject(err);
      });

      req.write(requestData);
      req.end();
    });
  }
}
