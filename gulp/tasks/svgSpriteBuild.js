var gulp = require('gulp');
var config = require('../config');
var svgSprite = require('gulp-svg-sprite');
var del = require('del');
var plumber = require('gulp-plumber');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var newer = require('gulp-newer');

gulp.task('cleansvgsprite', function() {
  return del.sync(config.src.img + '/sprite.svg');
});

gulp.task('remfill', function() {
  return gulp.src(config.src.spriteSvg + '/fill_removed/*.svg')
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(newer(config.src.spriteSvg))
    .pipe(cheerio({
      run: function($, file) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(gulp.dest(config.src.spriteSvg + '/fill_removed/'));
});


gulp.task('svgSpriteBuild', function() {
  return gulp.src([config.src.spriteSvg + '/fill_removed/*.svg', config.src.spriteSvg + '/default/*.svg'])
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(newer(config.src.spriteSvg))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg',
          render: {
            scss: {
              dest: '../../sass/_generated/_svgsprite.scss',
              template: '_sprite_template.scss'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(config.src.img));
});


gulp.task('svgSprite', function() {
  runSequence(
    'cleansvgsprite',
    'remfill',
    'svgSpriteBuild'
  );
});

gulp.task('svgCopy', function() {
  gulp.src([config.src.img + '/sprite.svg', ])
    .pipe(gulp.dest(config.dest.img));
});
