const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const commonConfig = require('./base.js');

module.exports = function () {
  return webpackMerge(commonConfig(), {
    cache: true,
    devtool: 'inline-source-map',
    devServer: {
      port: 7777,
      host: 'localhost',
      hot: true,
      noInfo: false,
      stats: 'minimal',
      inline: true,
      https: false,
      watchOptions: {
        poll: true
      },
      publicPath: commonConfig().output.publicPath.split('..')[1],
      compress: true, // Enable gzip compression for everything served:
      watchContentBase: true,
      contentBase: [path.join(__dirname, '../views')],
    },
    plugins: [
      // 压缩 js
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      }),

      new HtmlWebpackIncludeAssetsPlugin({
        assets: ['./.dll/vendor.dll.js', './.dll/vendor.dll.css'],
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
      })
      // new ExtractTextPlugin({
      //   disable: true
      // })
    ]
  });
};
