var gulp        = require('gulp');
var config      = require('../config');
var notify      = require("gulp-notify");
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: config.src.root
    },
    notify: false,
    open: false,
    // tunnel: true,
    // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
});
