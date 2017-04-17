const {resolve} = require('path')
const webpack = require('webpack')

const clientConfig = {
  name: 'Client build',
  context: resolve(__dirname),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index-client.js'
  ],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    inline: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/assets/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}], 'react'],
          plugins: ['transform-object-rest-spread', 'react-hot-loader/babel']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  ]
}

module.exports = clientConfig
