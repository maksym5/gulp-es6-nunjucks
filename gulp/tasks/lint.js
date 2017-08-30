var gulp        = require('gulp');
var config      = require('../config');
var htmlhint    = require('gulp-htmlhint');
var sassLint    = require('gulp-sass-lint');


gulp.task('lint:html', function() {
  return gulp.src(config.root + '/*.html')
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});

gulp.task('lint:sass', function() {
  return gulp.src([config.src.sass + '/app.sass', config.src.sass + '/_blocks/*.{sass,scss}'])
    .pipe(sassLint({
      options: {
        configFile: '.sass-lint.yml',
        formatter: 'checkstyle'
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('lint', [
  'lint:sass',
  'lint:html'
]);
