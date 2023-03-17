const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

gulp.task("minify", function () {
  return gulp
    .src("./js/main.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("."));
});

gulp.task("watch", function () {
  gulp.watch("./js/main.js", gulp.series("minify"));
});

gulp.task("default", gulp.series("minify", "watch"));
