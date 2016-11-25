var webpack = require('webpack');
var path = require('path');
var projectRootPath = path.resolve(__dirname, '../');
var libsPath = path.resolve(projectRootPath, './static/libs');
var CleanPlugin = require('clean-webpack-plugin');
var strip = require('strip-loader');

var vendors = [
    'react', 'react-dom', 'react-router', 'redux', 'redux-form', 'redux-router',
    'react-bootstrap',
    'antd',
    'history',
    'core-js'
]

module.exports = {
  entry: {
    "lib": vendors
  },
  output: {
    path: libsPath,
    filename: '[name].js',
    library: '[name]',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']}
    ]
  },
  plugins: [
    new CleanPlugin([libsPath], { root: projectRootPath }),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),

    new webpack.DllPlugin({
      path: libsPath + '/manifest.json',
      name: '[name]',
      context: libsPath
    }),
  ],
}
