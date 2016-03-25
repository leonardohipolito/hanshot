'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var imgur = require('imgur');

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function ImgurUploader(cache) {
  this.cache = cache;
}

ImgurUploader.prototype.upload = function (filePath, cb) {
  imgur.uploadFile(filePath)
  .then(function (response) {
    var link = response.data.link;
    cb(null, link);
  })
  .catch(function (err) {
    cb(err);
  });
};

module.exports = ImgurUploader;
