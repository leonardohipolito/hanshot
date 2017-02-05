const path = require('path');

module.exports = {

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

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },

  target: 'electron',

};
