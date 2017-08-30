var gulp        = require('gulp');
var config      = require('../config');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var del         = require('del');
var browserSync = require('browser-sync');
var babelify    = require('babelify');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var rename      = require('gulp-rename');
var source      = require('vinyl-source-stream');
var runSequence  = require('run-sequence');
var eslint  = require('gulp-eslint');


gulp.task('eslint', () => {
  return gulp.src([config.src.js + '/common.js', config.src.js + '/libs.js'])
    .pipe(eslint({
      fix: true,
      rules: {
        'no-undef': 0
      },
      globals: ['$']
    }))
    .pipe(eslint.format());
});

function bundle(bundler) {
  bundler
    .bundle()
    .pipe(source(config.src.js + '/common.js'))
    .pipe(buffer())
    .pipe(rename(config.src.outputFile))
    .pipe(gulp.dest(config.src.js))
    .pipe(browserSync.reload({stream: true}));
}

gulp.task('jsmin', function() {
  return gulp.src([		
    'app/js/bundle.js',
  ])
    .pipe(uglify())
    .pipe(gulp.dest(config.src.js))
});


gulp.task('scripts', ['eslint'], () => {
  var bundler = browserify(config.src.js + '/common.js')
    .transform(babelify, { presets: ['es2015'] });
  bundle(bundler);
});



gulp.task('removeLibs', function() {
  return del.sync(config.src.js + '/libs.js');
});

gulp.task('libs', function() {
  return gulp.src([		
    'app/js/others/*.js'
  ])
 	// .pipe(uglify())
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(config.src.js))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('createLibs', ['removeLibs', 'libs']);

gulp.task('bundle', function() {
  return gulp.src([		
    'app/js/bundle.js',
    'app/js/libs.js',
  ])
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(config.src.js))
});

gulp.task('complete', function() {
  runSequence(
    'jsmin',
    'bundle'
  );
});

