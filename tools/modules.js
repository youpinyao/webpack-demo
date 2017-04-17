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
    test: /\.(css|scss)$/,
    exclude: /(node_modules)/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins() {
            return [
              require('autoprefixer')({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 8', // doesn't support IE8 anyway
                ]
              })
            ];
          }
        }
      }, 'sass-loader', 'resolve-url-loader']
    })
  }, {
    test: /\.js?$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    exclude: /node_modules/
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
    test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg|ico)$/,
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
