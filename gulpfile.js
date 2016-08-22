'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//////////////////////////////
// Directories
//////////////////////////////

var dirs = {
  'sass': ['src/app/**/*.scss','src/sass/**/*.scss' ],
  'dist': 'dist/'
};


//////////////////////////////
// Sass Tasks
//////////////////////////////
gulp.task('sass', function () {
  gulp.src(dirs.sass)
    .pipe(sass({
      'outputStyle': 'expanded',
    })
      .on('error', sass.logError) // This keeps the rest of the Gulp tasks from stopping if there is an error
    )
    .pipe(autoprefixer()) // Run output through autoprefixer
    .pipe(gulp.dest(dirs.dist + 'css')) // Spit out CSS
});

gulp.task('sass:watch', function () {
  gulp.watch(dirs.sass, ['sass']);
});



gulp.task('watch', ['sass:watch']);
