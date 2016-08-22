'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify');


//////////////////////////////
// Directories
//////////////////////////////

var dirs = {
  'sass': ['src/app/**/*.scss','src/sass/**/*.scss' ],
  'dist': 'dist/',
  'js': [
    'src/app/app.js',
    'src/app/data/**/*.js',
    'src/app/filters/**/*.js',
    'src/app/components/**/*.js',
    'src/app/views/**/*.js',
    'src/js/**/*.js',
    '!src/**/*.min.js'
  ],
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

//////////////////////////////
// JavaScript Tasks
//////////////////////////////
gulp.task('js', function () {
  gulp.src(dirs.js)
    .pipe(concat('app.js'))
    .pipe(eslint()) // Linting
    .pipe(eslint.format())
    .pipe(uglify({ //Uglify
    }))
    .pipe(gulp.dest(dirs.dist + 'js')) // Write to JS folder in dist
    console.log('JS TASK');
});


gulp.task('js:watch', function () {
  gulp.watch(dirs.js, ['js']);
});



gulp.task('watch', ['sass:watch', 'js:watch']);
