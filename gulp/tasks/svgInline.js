var gulp = require('gulp');
var config = require('../config');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var runSequence = require('run-sequence');
var print = require('gulp-print');
var newer = require('gulp-newer');
var color = require('gulp-color');

gulp.task('svgRemoveAttr', function() {
  return gulp.src(config.src.svgInline + '/fill_removed/*.svg')
    .pipe(newer(config.src.svgInline))
    .pipe(cheerio({
      run: function($, file) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        filename = file.relative.slice(0, -4);
        svgPrintName = file.relative;
        $('svg').attr('class', 'icon ' + 'icon-' + filename);
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(print(function() {
      var colors1 = color('New clear icon: ' + svgPrintName, 'GREEN');
      return colors1;
    }))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gulp.dest(config.src.svgInline));
});


gulp.task('svgDefault', function() {
  return gulp.src(config.src.svgInline + '/default/*.svg')
    .pipe(newer(config.src.svgInline))
    .pipe(cheerio({
      run: function($, file) {
        filename = file.relative.slice(0, -4);
        svgPrintName = file.relative;
        $('svg').attr('class', 'icon ' + 'icon-' + filename);
      },
      parserOptions: {
        xmlMode: true
      },
    }))
    .pipe(print(function() {
      var colors2 = color('New default icon: ' + svgPrintName, 'GREEN');
      return colors2;
    }))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gulp.dest(config.src.svgInline));
});
