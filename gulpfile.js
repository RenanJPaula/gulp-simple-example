const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const { series, parallel, watch } = require('gulp');

function css(cb) {
  gulp
      .src('styles/**/*.scss')
      .pipe(sass())
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(csso())
      .pipe(
          rename({
            extname: '.min.css'
          })
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/'));
  cb();
}

function js(cb) {
  gulp
      .src('scripts/**/*.js')
      .pipe(
          babel({
            presets: ['@babel/env']
          })
      )
      .pipe(uglify())
      .pipe(
          rename({
            extname: '.min.js'
          })
      )
      .pipe(gulp.dest('dist/'));
  cb();
}
function watchFiles() {
  gulp.watch('styles/**/*.scss', css);
  gulp.watch('scripts/**/*.js', js);
}
exports.default = parallel(css, js);
exports.watch = parallel(watchFiles);