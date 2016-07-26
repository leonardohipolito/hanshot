const path = require('path');

// const nodeExternals = require('webpack-node-externals');


module.exports = {

  entry: {

    main: [
      './src/main.js'
    ],

  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.dist.js',
  },

  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],

    noParse: [

      // WARNING in ./~/es6-promise/dist/es6-promise.js
      // Module not found: Error: Cannot resolve module 'vertx'
      // in /node_modules/es6-promise/dist
      // @ ./~/es6-promise/dist/es6-promise.js 131:20-30
      /node_modules\/es6-promise\/dist\/es6-promise\.js/,

      // https://github.com/webpack/webpack/issues/138
      /node_modules\/json-schema\/lib\/validate\.js/,
    ],

  },

  // Supports require-ing Electron-specific and node modules
  target: 'electron',

  // TODO: find more about
  node: {
    // Depending on the config option node.__dirname:
    //  mock: equal “/“
    //  false: Not defined - points to built script directory ???
    //  true: node.js __dirname - relative path from start directory ???
    __dirname: false,
  },

  externals: [
    // Do not include node_modules in a bundle
    // nodeExternals()
  ],

};
