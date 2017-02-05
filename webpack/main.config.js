// Webpack config for Electron main process

const path = require('path');

const baseConfig = require('./base.config');

// Simple extend works for now
module.exports = Object.assign(baseConfig, {

  entry: {

    main: [
      './src/main.js',
    ],

  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.dist.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  target: 'electron',

});
