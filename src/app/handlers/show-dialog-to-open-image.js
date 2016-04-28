'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var Image = require('../../image/image');
var dialogFactory = require('../../factories/dialog');

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

module.exports = function (dispatcher, components) {

  return function () {
    dialogFactory.openImage(function (filePath) {
      components.gallery.add(new Image(filePath));
    });
  };

};
