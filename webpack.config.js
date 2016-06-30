module.exports = {

  entry: {

    main: './src/main.js',

    'dashboard-window/renderer/dashboard':
      './src/dashboard-window/renderer/dashboard.jsx',

    'settings-window/renderer/settings':
      './src/settings-window/renderer/settings.jsx',

    'selection/renderer/selection':
      './src/selection/renderer/selection.js',
  },

  output: {
    path: './src/',
    filename: '[name].dist.js',
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
      /node_modules\/json-schema\/lib\/validate\.js/,
    ],
  },

  // TODO: find more about
  //  Compile for usage in Electron -
  //  supports require-ing Electron-specific modules.
  target: 'electron',

  // TODO: find more about
  node: {
    // Depending on the config option node.__dirname:
    //  mock: equal “/“
    //  false: Not defined - points to built script directory ???
    //  true: node.js __dirname - relative path from start directory ???
    __dirname: false,
  },

};
