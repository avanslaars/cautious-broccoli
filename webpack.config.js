const path = require('path');
module.exports = [{
  entry: './index-client.js',
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
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

  entry: './index-server.js',
  output: {
    path: path.resolve('compiled_components'),
    filename: 'app.js',
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
