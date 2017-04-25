const path = require('path');
const fs = require('fs');
const config = require('../config/config.js');
const cheerio = require('cheerio');

const buildPath = path.resolve(__dirname, config.path);

module.exports = function () {

  fs.readdir(buildPath, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach(filename => {

      fs.stat(path.join(buildPath, filename), (ferr, fstats) => {
        if (ferr) {
          throw ferr;
        }

        if (fstats.isFile()) {
          if (filename.indexOf('.html') !== -1) {
            convertFile(path.join(buildPath, filename));
          }
        }
      });
    });
  });

  function convertFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }

      const $ = cheerio.load(data, {
        decodeEntities: false
      });

      $('link, script, img, video, audio').each(function () {
        if ($(this).attr('src')) {
          const src = $(this).attr('src');
          const srcc = src.replace(/\.\.\//g, './');

          $(this).attr('src', srcc);

          console.log(src, srcc);
          console.log('----------');
        }
        if ($(this).attr('href')) {
          const href = $(this).attr('href');
          const hrefc = href.replace(/\.\.\//g, './');

          $(this).attr('href', hrefc);

          console.log(href, ' to ', hrefc);
          console.log('----------');
        }
      });

      fs.writeFile(filePath, $.html(), {
        encoding: 'utf-8'
      });

    });
  }
};
