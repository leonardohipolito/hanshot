// Webpack config for Electron renderer processes

const path = require('path');

const baseConfig = require('./base.config');

// Simple extend works for now
module.exports = Object.assign(baseConfig, {

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

  resolve: Object.assign(baseConfig.resolve, {
    alias: Object.assign(baseConfig.resolve.alias, {
      'app/actions': 'src/actions.js',
      'app/dashboard/dispatch': 'src/dashboard/renderer/view-dispatch.js',
    }),
  }),

  target: 'electron-renderer',

});
