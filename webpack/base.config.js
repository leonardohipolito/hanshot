const path = require('path');

module.exports = {

  resolve: {

    modules: [
      path.join(__dirname, '..'),
      'node_modules',
    ],

    alias: {
      '~': 'src',
    },

  },

};
