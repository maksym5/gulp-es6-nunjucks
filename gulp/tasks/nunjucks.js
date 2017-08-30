var gulp              = require('gulp');
var config            = require('../config');
var prettify          = require('gulp-prettify');
var notify            = require('gulp-notify');
var plumber           = require('gulp-plumber');
var nunjucksRender    = require('gulp-nunjucks-render');
var gulpif            = require('gulp-if');
var changed           = require('gulp-changed');
var prettify          = require('gulp-prettify');
var frontMatter       = require('gulp-front-matter');
var print             = require('gulp-print');
var color             = require('gulp-color');

function renderHtml(onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src([config.src.templates + '/**/[^_]*.html'])
    .pipe(print(function(filename) {
      var colors4 = color('Changed: ' + filename.slice(19), 'GREEN');
      return colors4;
    }))
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(gulpif(onlyChanged, changed(config.src.root)))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(nunjucksRender({
      path: [config.src.templates]
    }))
    .pipe(prettify({
      indent_size: 2,
      wrap_attributes: 'auto', // 'force'
      preserve_newlines: false,
      // unformatted: [],
      end_with_newline: true
    }))
    .pipe(gulp.dest(config.src.root));
}

gulp.task('nunjucks', function() {
  return renderHtml();
});
