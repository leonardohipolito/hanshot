const path = require('path');

module.exports = {

  entry: {

    'dashboard-window': [
      './src/dashboard/renderer/dashboard.jsx',
    ],

    selection: [
      './src/selection/renderer/selection.js',
    ],

    notification: [
      './src/notification/renderer/notification.js',
    ],

  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:4000/dist/',
    filename: '[name].dist.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    modules: [
      path.join(__dirname, '..', 'src'),
      'node_modules',
    ],
    alias: {
      'app/actions': 'actions.js',
      'app/dashboard/dispatch': 'dashboard/renderer/view-dispatch.js',
    },
  },

  target: 'electron-renderer',

};
