module.exports = {
  host: '0.0.0.0',
  port: '8686',
  publicPath: '../',
  path: '../../dist/',
  entrys: [{
    html: './index.html',
    js: './js/index.js',
  }, {
    html: './other.html',
    js: './js/other.js',
  }]
};
