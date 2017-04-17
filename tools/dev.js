process.traceDeprecation = true;

const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./base.js');

const dllCssPath = './.dll/vendor.dll.css';
const assets = ['./.dll/vendor.dll.js'];

if (fs.existsSync(dllCssPath)) {
  assets.push(dllCssPath);
}

module.exports = function () {
  return webpackMerge(commonConfig(true), {
    cache: true,
    devtool: 'inline-source-map',
    devServer: {
      port: 8686,
      host: 'localhost',
      hot: true,
      noInfo: true,
      quiet: false,
      stats: 'errors-only',
      inline: true,
      https: false,
      watchOptions: {
        poll: true
      },
      publicPath: commonConfig().output.publicPath.split('..')[1],
      compress: true, // Enable gzip compression for everything served:
      watchContentBase: false,
      // contentBase: [path.join(__dirname, '../views'), path.join(__dirname, '../.dll')],
    },
    plugins: [
      new HtmlWebpackIncludeAssetsPlugin({
        assets,
        append: false,
        hash: true,
      }),

      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname),
        manifest: require('../.dll/vendor-manifest.json')
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),

      new ExtractTextPlugin({
        disable: true
      }),
    ]
  });
};
