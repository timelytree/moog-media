var gulp = require('gulp'),
    scss = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    path = require('path'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var config = {
  jsPath: './_js/',
  jsDestPath: './js/'
}

gulp.task('js', function() {
  return gulp.src([
      config.jsPath + 'jquery-3.1.1.min.js',
      config.jsPath + 'slick.min.js',
      config.jsPath + 'fractals.js',
      config.jsPath + 'googleMapINIT.js',
      config.jsPath + 'imagesLoaded.js',
      config.jsPath + '1_scriptFrame.js',
      config.jsPath + '2_scriptCore.js',
      config.jsPath + '3_scriptInit.js',
      config.jsPath + '4_scriptExec.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(config.jsDestPath))
});

// General gulp watch task
gulp.task('watch', function() {
  gulp.watch(config.jsPath + '/*.js', ['js']);
});

gulp.task('default', ['watch', 'js']);
