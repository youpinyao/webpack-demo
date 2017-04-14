const path = require('path');
const webpack = require('webpack');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {

  return {
    entry: {
      index: './js/index.js',
    },
    output: {
      filename: 'js/[name].[hash].js',
      publicPath: '/',
      path: path.resolve(__dirname, '../dist/'),
      sourceMapFilename: '[name].[hash].map'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [path.join(__dirname, 'js/lib'), 'node_modules']
    },
    module: {
      rules: [{
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'html-loader',
          options: {
            ignoreCustomFragments: [/\{\{.*?}}/],
            attrs: ['img:src', 'link:href']
          }
        }]
      }, {
        test: /\.(css|sass)$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
        })
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', 'stage-0']
            ],
            plugins: [
              'syntax-dynamic-import',
              'transform-es3-property-literals',
              'transform-es3-member-expression-literals'
            ]

          }
        }]
      }, {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[path][name].[hash].[ext]',
            limit: 10000
          }
        }]
      }, {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),

      // 压缩 js
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      }),

      // 输出 css
      new ExtractTextPlugin('css/[name].[hash].css'),

      // 输出公共模块
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks(module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),

      // 输出 manifest 文件
      // new ChunkManifestPlugin({
      //   filename: 'chunk-manifest.json',
      //   manifestVariable: 'webpackManifest',
      // }),

      // HTML 注入
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'templates/index.html',
        chunksSortMode: 'dependency',
        chunks: ['index', 'vendor'],
        inject: 'body', // true | 'head' | 'body' | false
      })
    ]
  };
};
