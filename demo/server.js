'use strict';

const path = require('path');
const config = require('./webpack.config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { PORT } = process.env;
const port = PORT ? Number(PORT) : 3000;

config.entry.app.unshift(
  // activate HMR for React
  'react-hot-loader/patch',
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint
  'webpack-dev-server/client?http://0.0.0.0:' + port,
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  'webpack/hot/only-dev-server'
);
config.plugins.push(
  // enable HMR globally
  new webpack.HotModuleReplacementPlugin(),
  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin()
);

const compiler = webpack(config);
// webpack-dev-server config
const options = {
  // enable HMR on the server
  hotOnly: true,
  host: '0.0.0.0',
  contentBase: path.join(__dirname, 'public'),
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false
  },
  overlay: {
    warnings: true,
    errors: true
  },
  historyApiFallback: true
};

const server = new WebpackDevServer(compiler, options);

server.listen(port, '0.0.0.0', () => {
  console.log('\n>> Listening at http://0.0.0.0:' + port + '\n');
});
