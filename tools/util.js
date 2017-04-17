const entrys = require('./config.js').entrys;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  getName(path) {
    let name = path.split('/');

    name = name[name.length - 1].split('.')[0];

    return name;
  },
  htmls() {
    const plugins = [];

    entrys.forEach(v => {

      const htmlName = this.getName(v.html);
      const jsName = this.getName(v.js);

      plugins.push(new HtmlWebpackPlugin({
        title: htmlName,
        minify: false,
        filename: v.html,
        template: v.html,
        chunks: [jsName, 'vendor'],
        inject: 'body', // true | 'head' | 'body' | false
      }));

    });

    return plugins;
  },
  entrys(isDev) {
    const entry = {};

    entrys.forEach(v => {

      const jsName = this.getName(v.js);

      entry[jsName] = [v.js];

      if (isDev) {
        entry[jsName] = entry[jsName].concat([
          'webpack/hot/only-dev-server'
        ]);
      }

    });

    return entry;

  }
};
