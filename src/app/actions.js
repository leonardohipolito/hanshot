'use strict';

//------------------------------------------------------------------------------
// Module
//------------------------------------------------------------------------------

// App

exports.APP_QUIT = 'APP_QUIT';
exports.appQuit = function () {
  return {
    actionName: exports.APP_QUIT
  };
};

// Copy

exports.COPY_IMAGE = 'COPY_IMAGE';
exports.copyImage = function (filePath) {
  return {
    actionName: exports.COPY_IMAGE,
    filePath: filePath
  };
};

exports.COPY_TEXT = 'COPY_TEXT';
exports.copyText = function (text) {
  return {
    actionName: exports.copyText,
    text: text
  };
};
