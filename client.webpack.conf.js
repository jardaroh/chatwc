const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConf = require('./base.webpack.conf');

const conf = Object.assign({
  entry: './src/chat-app.ts',
  output: {
    filename: 'chat-app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/index.html', to: './' },
      ],
    }),
  ],
}, baseConf);

module.exports = conf;
