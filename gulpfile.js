const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoPrefixer = require('autoprefixer');

function scssTask() {
  return src('src/sass/index.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoPrefixer()]))
    .pipe(dest('src/css', { sourcemaps: '.' }));
}

function watchTask() {
  watch(['src/sass/**/*.scss'], scssTask);
}

exports.default = series(scssTask, watchTask);
