var gulp         = require('gulp');
var config       = require('../config');
var imagemin     = require('gulp-imagemin');
var plumber      = require('gulp-plumber');
var cache        = require('gulp-cache');
var print        = require('gulp-print');
var color        = require('gulp-color');



gulp.task('imagemin', function() {
  return gulp.src([
    '!' + config.src.img + '/sprite_{img,svg}/**/*',
    config.src.img + '/**/*.{jpg,png,svg,gif}'
  ])
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(print(function(filepath) {
      var colors1 = color('Compressed image: ' + filepath, 'GREEN');
      return colors1;
    }))
    .pipe(gulp.dest(config.dest.img)); 
});
