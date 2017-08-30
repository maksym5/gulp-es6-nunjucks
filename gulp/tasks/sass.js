var gulp         = require('gulp');
var config       = require('../config');
var sass         = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var shorthand    = require('gulp-shorthand');
var mqpacker     = require('css-mqpacker');
var notify       = require('gulp-notify');
var cleanCSS     = require('gulp-clean-css');
var sourcemaps   = require('gulp-sourcemaps');
var rename       = require('gulp-rename');
var postcss      = require('gulp-postcss');
var browserSync  = require('browser-sync');


var processors = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }),
  // require('lost'),
  mqpacker({
    sort: sortMediaQueries
  })
];


gulp.task('sass', function() {
  return gulp.src(config.src.sass + '/**/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', config.errorHandler)
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.src.css))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('cssshort', function() {
  return gulp.src(config.src.css + '/app.min.css')
    .pipe(shorthand())
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.dest.css));
});


function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}
