/**
 * Learn gulp
 *
 */

/**
 * Variables
 */
var gulp = require('gulp');
var gls = require('gulp-live-server');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

/**
 * Path Variables
 */
var paths = {
	dist: 'dist/',
	sass: 'static/sass/**/*.scss',
	sassFolder: 'static/sass',
	scripts: 'static/js/**/*.js',
	images: 'static/img/*'
};

/**
 * Sass task.
 * Compile sass file to css and inject to single file.
 */
gulp.task('sass', function() {
	gulp.src(paths.sass)
		.on('error', function() {
			console.log('error');
		})
		.pipe(gulp.dest(paths.dist));
});

/**
 * Static task.
 * Static server.
 */
gulp.task('static', function() {
	var server = gls.static('static', 8000);
	server.start();
	gulp.watch(['static/**/*.css', 'static/**/*.html'], server.notify);
});

/**
 * scripts task.
 * Minify and save all js file to one file.
 */
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

/**
 * Minify task.
 * minify all html files.
 */
gulp.task('minify', function() {
	return gulp.src('static/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'))
});

/**
 * Minify-css task.
 * minify all css files
 */
gulp.task('minify-css', function() {
	return gulp.src('static/css/**/*.css')
		.pipe(minifyCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('dist/css'));
});

/**
 * Images task.
 * Copy all static images
 */
gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest('dist/img'));
});

/**
 * default task.
 * Run default task with gulp command
 */
gulp.task('default', ['scripts', 'minify', 'minify-css', 'images', 'sass'], function() {
	gulp.run('sass');
});
