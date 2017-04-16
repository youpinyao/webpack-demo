const path = require('path');
const webpack = require('webpack');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


const modules = require('./modules.js');

module.exports = function () {

  return {
    entry: {
      index: './js/index.js',
    },
    output: {
      filename: 'js/[name].[hash].js',
      publicPath: '../',
      path: path.resolve(__dirname, '../dist/'),
      sourceMapFilename: '[name].[hash].map'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [path.join(__dirname, 'js/lib'), 'node_modules']
    },
    module: modules,
    plugins: [

      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new ProgressBarPlugin(),

      // 输出 css
      new ExtractTextPlugin('css/[name].[hash].css'),

      // HTML 注入
      new HtmlWebpackPlugin({
        title: '首页',
        minify: false,
        filename: 'views/index.html',
        template: 'views/index.html',
        chunks: ['index', 'vendor'],
        inject: 'body', // true | 'head' | 'body' | false
      })
    ]
  };
};
