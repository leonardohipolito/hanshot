'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var Jimp = require('jimp');

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

// Extend Jimp itself instead of inheriting to simplify things

// Crops alpha areas from the right and bottom edges of the image
// @param (optional) cb a callback for when complete
// @returns this for chaining methods
Jimp.prototype.autocropRightBottomAlpha = function (cb) {

  var cropX = 0, cropY = 0;

  // find farthest visible (non-alpha) point
  this.scan(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
    var alpha = this.bitmap.data[idx + 3];
    // zero means completely invisible
    if (alpha !== 0) {
      cropX = Math.max(cropX, x);
      cropY = Math.max(cropY, y);
    }
  });

  if (cropX > 0 && cropY > 0) {
    this.crop(0, 0, cropX, cropY);
  }

  if (typeof cb === 'function') {
    return cb(null, this);
  }

  return this;
};

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = Jimp;
