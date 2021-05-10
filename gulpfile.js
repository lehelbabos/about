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
    nodemon = require('gulp-nodemon'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path'),
    inject = require('gulp-inject')


//////////////////////////////
// Directories
//////////////////////////////

var dirs = {
  'sass': ['src/components/**/*.scss','src/sass/**/*.scss' ],
  'dist': 'dist/',
  'docs': 'docs/',
  'js': [
    'src/js/**/*.js',
    'src/components/**/*.js',
    '!src/**/*.min.js'
  ],
  'images': 'src/images/*.*',
  'icons': 'src/icons/*.svg',
  'fonts': 'src/fonts/*.*',
};


//////////////////////////////
// Sass Tasks
//////////////////////////////
gulp.task('sass', function () {
  gulp.src(dirs.sass)
    .pipe(sass({
      'includePaths': 'node_modules',
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

gulp.task('sass:publish', function () {
  gulp.src(dirs.sass)
    .pipe(sass({
      'includePaths': 'node_modules',
      'outputStyle': 'compressed',
    })
      .on('error', sass.logError) // This keeps the rest of the Gulp tasks from stopping if there is an error
    )
    .pipe(autoprefixer()) // Run output through autoprefixer
    .pipe(gulp.dest(dirs.dist + 'css')) // Spit out CSS to docs folder
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
// SVG Icon Sheet Build and Inject Task
//////////////////////////////
gulp.task('svgstore', function () {
  var svgs = gulp
  .src(dirs.icons)
  .pipe(svgmin(function getOptions (file) {
    var prefix = path.basename(file.relative, path.extname(file.relative));
    return {
        plugins: [{
            cleanupIDs: {
                minify: true
            }
        }]
    }
}))
  .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
    return file.contents.toString();
  }

  return gulp
   .src('index.html')
   .pipe(inject(svgs, { transform: fileContents }))
   .pipe(gulp.dest('./')
 );
});

gulp.task('svgstore:watch', function () {
  gulp.watch(dirs.icons, ['svgstore']);
});

//////////////////////////////
// Font Task
//////////////////////////////
gulp.task('fonts', function () {
    return gulp.src(dirs.fonts)
    .pipe(gulp.dest(dirs.dist + 'fonts'));
});

gulp.task('fonts:watch', function () {
  gulp.watch(dirs.fonts, ['fonts']);
});

//////////////////////////////
// Copy
//////////////////////////////

gulp.task('copy', function () {
  gulp.src('index.html')
  .pipe(gulp.dest(dirs.docs));
  gulp.src(dirs.dist + '*/**')
  .pipe(gulp.dest(dirs.docs));
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

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['sass', 'js', 'imagemin']);
gulp.task('watch', ['sass:watch', 'js:watch', 'imagemin:watch', 'svgstore:watch', 'browser-sync']);
gulp.task('publish',['sass:publish', 'js', 'imagemin', 'copy']);
