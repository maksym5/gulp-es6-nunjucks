var gulp         = require('gulp');
var config       = require('../config');
var del          = require('del');
var spritesmith  = require('gulp.spritesmith');


gulp.task('cleansprite', function() {
  return del.sync(config.src.spriteImg + '/sprite.png');
});

gulp.task('spritemade', function() {
  var spriteData =
        gulp.src(config.src.spriteImg + '/*.*')
          .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.sass',
            padding: 15,
            cssFormat: 'sass',
            cssTemplate: 'sass.template.mustache',
          }));

  spriteData.img.pipe(gulp.dest(config.src.img)); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest(config.src.generated)); // путь, куда сохраняем стили
});
gulp.task('sprite', ['cleansprite', 'spritemade']);
