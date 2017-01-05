'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');




//////////////////////////////
// Directories
//////////////////////////////

var dirs = {
  'sass': ['src/components/**/*.scss','src/sass/**/*.scss' ],
  'dist': 'dist/',
  'js': [
    'src/js/**/*.js',
    'src/components/**/*.js',
    '!src/**/*.min.js'
  ],
  'images': 'src/images/*.*',
  'src': 'src/**/*.*',
  'index': 'index.html',
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

//////////////////////////////
// ImageMin Tasks
//////////////////////////////
gulp.task('imagemin', function () {
  gulp.src(dirs.images)
    .pipe(imagemin())
    .pipe(gulp.dest(dirs.dist + 'images'))
    console.log('IMAGEMIN TASK');
});

gulp.task('imagemin:watch', function () {
  gulp.watch(dirs.images, ['imagemin']);
});


//////////////////////////////
// Browser Sync
//////////////////////////////
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:9001",
        files: ["src/**/*.*", "index.html"],
        browser: "google chrome",
        port: 9002,
	});
});

//////////////////////////////
// Nodemon
//////////////////////////////
gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function () { // to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});



gulp.task('watch', ['sass:watch', 'js:watch', 'imagemin:watch', 'browser-sync']);
