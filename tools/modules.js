const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  rules: [{
    test: /\.html$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'html-loader',
      options: {
        interpolate: true,
        ignoreCustomFragments: [/\{\{.*?}}/],
        attrs: ['img:src', 'link:href'],
        minimize: false
      }
    }]
  }, {
    test: /\.(css|sass)$/,
    exclude: /(node_modules)/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'autoprefixer-loader', 'resolve-url-loader', 'sass-loader']
    })
  }, {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
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
    exclude: [/\.(spec|e2e)\.ts$/, /(node_modules)/]
  }]
};

// {
//   test: /\.ejs$/,
//   loader: 'ejs-loader',
//   query: {
//     variable: 'data',
//     interpolate: '\\{\\{(.+?)\\}\\}',
//     evaluate: '\\[\\[(.+?)\\]\\]'
//   }
// }
