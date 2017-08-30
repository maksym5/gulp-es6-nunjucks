var gulp         = require('gulp');
var config       = require('../config');
var del          = require('del');
var cache        = require('gulp-cache');
var runSequence  = require('run-sequence');

function build(cb) {
  runSequence(
    'removedist',
    'htmlminify',
    'imagemin',
    'complete',
    'cssshort',
    'svgCopy',
    cb
  );
}

gulp.task('build', function(cb) 

{
  build(cb);
  var buildFiles = gulp.src([
    config.src.root + '/.htaccess',
    // config.src.root + '/*.html',
  ]).pipe(gulp.dest(config.dest.root));

  var buildFonts = gulp.src([
    config.src.fonts + '/**/*',
  ]).pipe(gulp.dest(config.dest.fonts));

  var buildCss = gulp.src([
    config.src.css + '/*.map',
  ]).pipe(gulp.dest(config.dest.css));

  var buildJs = gulp.src([
    config.src.js + '/bundle.{js,min.js}',
  ]).pipe(gulp.dest(config.dest.js));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function() { return cache.clearAll(); });
