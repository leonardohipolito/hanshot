const path = require('path');

// const nodeExternals = require('webpack-node-externals');


module.exports = {

  entry: {

    'dashboard-window': [
      './src/dashboard/renderer/dashboard.jsx',
    ],

    'selection': [
      './src/selection/renderer/selection.js',
    ],

  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:4000/dist/',
    filename: '[name].dist.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      // },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],

    // Skip parsing of particular files
    noParse: [

      // WARNING in ./~/es6-promise/dist/es6-promise.js
      // Module not found: Error: Cannot resolve module 'vertx'
      // in /node_modules/es6-promise/dist
      // @ ./~/es6-promise/dist/es6-promise.js 131:20-30

      // /node_modules\/es6-promise\/dist\/es6-promise\.js/,

      // https://github.com/webpack/webpack/issues/138
      // /node_modules\/json-schema\/lib\/validate\.js/,
    ],
  },

  // Supports require-ing Electron-specific and node modules
  target: 'electron',

  externals: [
    // Do not include node_modules in a bundle
    // nodeExternals({
      // whitelist: ['webpack/hot/dev-server'],
    // }),
  ],

};
