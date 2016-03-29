
exports.Imgur = require('./imgur');
exports.Dropbox = require('./dropbox');

exports.getList = function () {
  return [
    { id: 'Imgur', name: 'Imgur' },
    { id: 'Dropbox', name: 'Dropbox' }
  ];
};
