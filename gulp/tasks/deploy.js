var gulp         = require('gulp');
var config       = require('../config');
var notify         = require('gulp-notify');
var ftp          = require('vinyl-ftp');


gulp.task('deploy', function() {

  var conn = ftp.create({
    host:      'hostname.com',
    user:      'username',
    password:  'userpassword',
    parallel:  10,
    log: gutil.log
  });

  var globs = [
    config.dest.root + '/**',
    config.dest.root + '/.htaccess',
  ];
  return gulp.src(globs, {buffer: false})
    .pipe(conn.dest('/path/to/folder/on/server'));

});