var gulp = require('gulp'),
    scss = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    path = require('path'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var p = {
     scssPath: './scss/',
    jsPath: './js/',
    cssDestPath: './dist/css/',
    jsDestPath: './dist/js/'
}

// Compiles SCSS in [assets/scss]
gulp.task('scss', function() {
  return gulp.src(p.scssPath + '*.scss')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(scss())
    .pipe(gulp.dest(p.cssDestPath))
});

gulp.task('js', function() {
  return gulp.src([
      p.jsPath + 'fractals.js',
      p.jsPath + 'masonry.min.js',
      p.jsPath + 'googleMapINIT.js',
      p.jsPath + '1_scriptFrame.js',
      p.jsPath + '2_scriptCore.js',
      p.jsPath + '3_scriptInit.js',
      p.jsPath + '4_scriptExec.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(p.jsDestPath))
});

// General gulp watch task
gulp.task('watch', function() {
  gulp.watch(p.scssPath + '/*.scss', ['scss']);
  gulp.watch(p.jsPath + '/*.js', ['js']);
});

gulp.task('default', ['watch', 'scss', 'js']);
