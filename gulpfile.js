'use strict';
 
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const concat = require('gulp-concat');
const cssnano = require("cssnano");
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
 
sass.compiler = require('node-sass');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./public"
    },
    port: 3000
  });
  done();
}

// CSS task
function css() {
  return gulp
    .src("./source/css/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./public"))
    .pipe(browsersync.stream());
}


// Scripts
function js() {
  return (
    gulp
      .src(["./source/js/index.js"])
      .pipe(plumber())
      .pipe(gulpIf('*.js', uglify()))
      .pipe(concat('script.js'))
      .pipe(gulp.dest("./public"))
      .pipe(browsersync.stream())
  );
}


function watchFiles() {
  gulp.watch("./source/**/*", css);
  gulp.watch("./source/**/*", js);
  gulp.watch("./public/*.html");
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.watch = watch;

