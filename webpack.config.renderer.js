const path = require('path');

module.exports = {

  entry: {

    'dashboard-window': [
      './src/dashboard/renderer/dashboard.jsx',
    ],

    selection: [
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
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },

  target: 'electron',

};
