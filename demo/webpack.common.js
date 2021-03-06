'use strict';

const webpack = require('webpack');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
process.env.BABEL_ENV = process.env.NODE_ENV;

// ----- devtool

let devtool;
if (isDev) {
  // https://webpack.js.org/configuration/devtool/
  devtool = 'eval';
} else {
  // https://webpack.js.org/configuration/devtool/
  devtool = 'source-map';
}
module.exports.devtool = devtool;

// ---- entry

const entry = {
  vendor: ['babel-polyfill'],
  app: ['./src/index.js']
};

module.exports.entry = entry;

// ---- output

const output = {
  path: path.resolve(__dirname, 'public'),
  filename: '[name].bundle.js',
  publicPath: ''
};

module.exports.output = output;

// ----- rules
const jsRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['babel-loader']
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCssPlugin = new ExtractTextPlugin({
  filename: 'style.css',
  allChunks: true
});

const LOCAL_IDENT_NAME_DEV = '[path]---[name]---[local]---[hash:base64:5]';
const LOCAL_IDENT_NAME_PROD = '[hash:base64]';
const getCssLoaderOptions = (opt = {}) => {
  return Object.assign(
    {
      minimize: true,
      localIdentName: isDev ? LOCAL_IDENT_NAME_DEV : LOCAL_IDENT_NAME_PROD
    },
    opt
  );
};

const loaders = {
  style: { loader: 'style-loader' },
  css: { loader: 'css-loader', options: getCssLoaderOptions() },
  cssModule: {
    loader: 'css-loader',
    options: getCssLoaderOptions({ modules: true })
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      plugins: () => [require('autoprefixer')]
    }
  },
  sass: {
    loader: 'sass-loader'
  }
};

const cssDevRule = {
  test: /\.css$/,
  exclude: /\.module\.css$/,
  use: [loaders.style, loaders.css, loaders.postcss]
};
const cssProdRule = {
  test: /\.css$/,
  exclude: /\.module\.css$/,
  use: extractCssPlugin.extract({
    fallback: loaders.style,
    use: [loaders.css, loaders.postcss]
  })
};
const cssModulesDevRule = {
  test: /\.module\.css$/,
  use: [loaders.style, loaders.cssModule, loaders.postcss]
};

const cssModulesProdRule = {
  test: /\.module\.css$/,
  use: extractCssPlugin.extract({
    fallback: loaders.style,
    use: [loaders.cssModule, loaders.postcss]
  })
};

const fileRule = {
  test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
  use: ['file-loader']
};

const sassDevRule = {
  test: /\.scss$/,
  exclude: /\.module\.scss$/,
  use: [loaders.style, loaders.css, loaders.postcss, loaders.sass]
};

const sassProdRule = {
  test: /\.scss$/,
  exclude: /\.module\.scss$/,
  use: extractCssPlugin.extract({
    fallback: loaders.style,
    use: [loaders.css, loaders.postcss, loaders.sass]
  })
};

const sassCssModuleDevRule = {
  test: /\.module\.scss$/,
  use: [loaders.style, loaders.cssModule, loaders.postcss, loaders.sass]
};

const sassCssModuleProdRule = {
  test: /\.module\.scss$/,
  use: extractCssPlugin.extract({
    fallback: loaders.style,
    use: [loaders.cssModule, loaders.postcss, loaders.sass]
  })
};

module.exports.jsRule = jsRule;
module.exports.fileRule = fileRule;
module.exports.cssDevRule = cssDevRule;
module.exports.cssProdRule = cssProdRule;
module.exports.cssModulesDevRule = cssModulesDevRule;
module.exports.cssModulesProdRule = cssModulesProdRule;
module.exports.sassDevRule = sassDevRule;
module.exports.sassProdRule = sassProdRule;
module.exports.sassCssModuleDevRule = sassCssModuleDevRule;
module.exports.sassCssModuleProdRule = sassCssModuleProdRule;

let rules = [];
if (isDev) {
  rules = [
    jsRule,
    fileRule,
    cssDevRule,
    cssModulesDevRule,
    sassDevRule,
    sassCssModuleDevRule
  ];
} else {
  // prod
  rules = [
    jsRule,
    fileRule,
    cssProdRule,
    cssModulesProdRule,
    sassProdRule,
    sassCssModuleProdRule
  ];
}
module.exports.rules = rules;

// ----- plugins
const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: Infinity
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const uglifyJSPlugin = new UglifyJSPlugin({
  parallel: true
});

// for webpack 3 to enable scope hoisting
const moduleConcatPlugin = new webpack.optimize.ModuleConcatenationPlugin();

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: 'report.html'
});

// prints more readable module names in the browser console on HMR updates
const namedModulesPlugin = new webpack.NamedModulesPlugin();

module.exports.commonsChunkPlugin = commonsChunkPlugin;
module.exports.definePlugin = definePlugin;
module.exports.uglifyJSPlugin = uglifyJSPlugin;
module.exports.moduleConcatPlugin = moduleConcatPlugin;
module.exports.extractCssPlugin = extractCssPlugin;
module.exports.namedModulesPlugin = namedModulesPlugin;

let plugins = [];
if (isDev) {
  plugins = [namedModulesPlugin];
} else {
  plugins = [
    commonsChunkPlugin,
    definePlugin,
    uglifyJSPlugin,
    extractCssPlugin,
    moduleConcatPlugin,
    bundleAnalyzerPlugin
  ];
}
module.exports.plugins = plugins;
