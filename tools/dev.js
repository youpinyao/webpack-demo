const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
// const path = require('path');
const commonConfig = require('./base.js');

module.exports = function () {
  return webpackMerge(commonConfig(), {
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
      publicPath: commonConfig().output.publicPath,
      compress: true, // Enable gzip compression for everything served:
      watchContentBase: true,
      // contentBase: [path.join(__dirname, '../dist'), path.join(__dirname, '../dist/assets')],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    ]
  });
};
