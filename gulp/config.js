var util = require('gulp-util');
var destPath = 'dist';
var config = {
  src: {
    root           : 'app',
    sass           : 'app/sass',
    generated      : 'app/sass/_generated',
    img            : 'app/img',
    css            : 'app/css',
    fonts          : 'app/fonts',
    js             : 'app/js',
    others         : 'app/js/others',
    libs           : 'app/libs',
    icons          : 'app/img/icons',
    icons_color    : 'app/img/icons_color',
    templates      : 'app/templates',
    svgInline      : 'app/templates/svg',
    spriteImg      : 'app/img/sprite_img',
    spriteSvg      : 'app/img/sprite_svg',
    outputFile     : 'bundle.js'
  },
  dest: {
    root           : destPath,
    html           : destPath,
    css            : destPath + '/css',
    img            : destPath + '/img',
    js             : destPath + '/js',
    fonts          : destPath + '/fonts',
  },
  errorHandler : require('./util/handle-errors')
};

module.exports = config;
