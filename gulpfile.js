'use strict';

var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    watch   = require('gulp-watch');

var paths = {
    scss: './public/sass/main.scss'
};

/**
 * Compile all SASS files
 * @return
 */
gulp.task('scss', function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      outputStyle: gulp.env.production ? 'compressed' : 'expanded',
      includePaths: ['./public/sass'],
      errLogToConsole: gulp.env.watch
    }))
    .pipe(gulp.dest('./public/dist/styles'));
});

/**
 * Watch for changes on SASS folder and run scss task
 * @return
 */
gulp.task('scss:watch', function() {
  watch('./public/sass/**/*.scss', function() {
    gulp.src('./public/sass/main.scss')
      .pipe(sass({
        outputStyle: gulp.env.production ? 'compressed' : 'expanded',
        includePaths: ['./app/sass'],
        errLogToConsole: gulp.env.watch
      }))
      .pipe(gulp.dest('./public/dist/styles'));
  });
});

/**
 * run nodemon on development env
 * @return
 */
gulp.task('serve', function () {
  gulp.env.watch = true;
  nodemon({ script: 'app.js', ext: 'js', env: { 'CLOUD_ENV': 'development' }, ignore: ["node_modules/**/*", "public/**/*", "views/**/*"] })
    .on('restart', function () {
      console.log('restarted!');
    });
});
/**
 * define a defult task to run serve, scss and watch scss folder
 * @type {[type]}
 */
gulp.task('default', ['serve', 'scss:watch', 'scss']);

