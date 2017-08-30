var gulp    = require('gulp');
var config  = require('../config');
var htmlmin = require('gulp-htmlmin');

gulp.task('htmlminify', function() {
  return gulp.src(config.src.root + '/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.dest.root));
});