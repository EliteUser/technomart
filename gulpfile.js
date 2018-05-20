"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const autoprefixer = require("autoprefixer");
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const run = require("run-sequence");
const del = require("del");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglifyJs = require("gulp-uglifyjs");

/* Директории: исходники и сборка */

const config = {
  src: "./src",
  build: "./build"
};

/* Сервер с отслеживанием изменений */

gulp.task("browserSync", function () {
  browserSync.init({
    server: config.build
  });

  gulp.watch(`${config.src}/scss/**/*.{scss,sass}`, ["style"]);
  gulp.watch(`${config.src}/js/**/*.js`, ["js"]);
  gulp.watch(`${config.src}/*.html`, ["html"]);
  gulp.watch(`${config.build}/**/*.*`).on('change', browserSync.reload);
});

/* Сборка стилей и минификация */

gulp.task("style", function () {
  return gulp.src(`${config.src}/scss/style.scss`)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(`${config.build}/css`))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(`${config.build}/css`));
});

/* Normalize.css */

gulp.task("normalize", function () {
  return gulp.src(`${config.src}/scss/normalize.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(minify())
    .pipe(rename("normalize.min.css"))
    .pipe(gulp.dest(`${config.build}/css`));
});

/* Транспайлинг JS и минификация */

gulp.task("js", function () {
  return gulp.src(`${config.src}/js/**/*.js`)
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(`${config.build}/js`))
    .pipe(uglifyJs())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest(`${config.build}/js`));
});

/* Оптимизация картинок */

gulp.task("images", function () {
  return gulp.src(`${config.src}/img/**/*.{png,jpg,svg}`)
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(gulp.dest(`${config.src}/img`));
});

/* Конвертация в webp */

gulp.task("webp", function () {
  return gulp.src(`${config.src}/img/**/*.{png,jpg}`)
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest(`${config.src}/img`));
});

/* Сборка SVG спрайта */

gulp.task("sprite", function () {
  return gulp.src(`${config.src}/img/icon-*.svg`)
    .pipe(plumber())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(`${config.build}/img`))
});

/* Инлайнинг спрайта в HTML */

gulp.task("html", function () {
  return gulp.src(`${config.src}/*.html`)
    .pipe(plumber())
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(config.build))
});

/* Удаление папки с билдом */

gulp.task("clean", function () {
  return del(config.build)
});

/* Копирование в папку с билдом */

gulp.task("copy", function () {
  return gulp.src([
    `${config.src}/fonts/**/*.{woff,woff2}`,
    `${config.src}/img/**`,
    // `${config.src}/js/**`
  ], {
    base: config.src
  })
    .pipe(gulp.dest(config.build));
});

/* Сборка проекта */

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "normalize",
    "style",
    "sprite",
    "html",
    "js",
    done
  );
});
