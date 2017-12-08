'use strict';

const path = require('path');
const webpack = require('webpack');
const { devtool, rules, plugins } = require('./webpack.common');
const isDev = process.env.NODE_ENV !== 'production';


const svgSpriteRule = {
  test: /\.svg$/,
  use: ['svg-sprite-loader']
};

// ---- entry

const entry = {
  app: ['./src/app.js']
};

// ---- output

const output = {
  path: path.resolve(__dirname, 'public', 'assets'),
  filename: '[name].bundle.js',
  publicPath: '/assets/'
};

const vendor = [
  'babel-polyfill',
  'react',
  'react-dom',
  'redux',
  'react-router-dom'
];
if (!isDev) entry.vendor = vendor; // generate common vendor bundle in prod

if (isDev) {
  const dllRefPlugin = new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./public/assets/vendor-manifest.json')
  });
  plugins.push(dllRefPlugin);
}

module.exports = {
  devtool,
  entry,
  output,
  module: {
    rules: [svgSpriteRule, ...rules]
  },
  resolve: {
    alias: {
      "sms-phone-validator": path.resolve(__dirname, "../src")
    }
  },
  plugins
};
