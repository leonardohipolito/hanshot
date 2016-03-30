var _ = require('lodash');

exports.Imgur = require('./imgur');
exports.Dropbox = require('./dropbox');

exports.getList = function () {
  return [
    {
      id: 'Imgur',
      name: 'Imgur',
      isDefault: true
    },
    {
      id: 'Dropbox',
      name: 'Dropbox',
      isDefault: false
    }
  ];
};

exports.getDefault = function () {
  var uploader = _.find(this.getList(), { isDefault: true });
  return this[uploader.id];
};
