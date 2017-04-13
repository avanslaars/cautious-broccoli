const path = require('path');
module.exports = [{
  entry: './client/index-client.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-object-rest-spread'],
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}, {

  entry: './client/index-server.js',
  output: {
    path: path.resolve('components'),
    filename: 'components.js',
    libraryTarget: 'commonjs-module'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-object-rest-spread'],
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}]
