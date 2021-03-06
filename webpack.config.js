const path = require('path');
const moduleConfig = {
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

module.exports = [{
  name: 'Client build',
  entry: './index-client.js',
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  module: moduleConfig
}, {
  name: 'Server build',
  entry: './index-server.js',
  output: {
    path: path.resolve('compiled_components'),
    filename: 'app.js',
    libraryTarget: 'commonjs-module'
  },
  module: moduleConfig
}]
