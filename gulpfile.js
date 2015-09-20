/**
 * Learn gulp
 * This gulpfile for learn gulp and writing plugins
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
var inject = require('gulp-inject');
var filter = require('gulp-filter');

/**
 * Path Variables
 */
var paths = {
	dist: 'dist/',
	sass: ['static/sass/**/*.scss'],
	sassFolder: 'static/sass',
	scripts: 'static/js/**/*.js',
	css: 'static/css/**/*.css',
	images: 'static/img/*',
	indexFile: 'static/index.html',
	src: 'static'
};

/**
 * Sass task.
 * Compile sass file to css and inject to single file.
 */

gulp.task('sass', function () {
  gulp.src('./static/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
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
gulp.task('minify-css', ['inject'], function() {
	return gulp.src('static/css/**/*.css')
		.pipe(minifyCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('dist/css'));
});

/**
 * Inject task.
 */
gulp.task('inject', function() {
	var target = gulp.src(paths.indexFile);
	var sources = gulp.src(paths.css, {
		read: false
	});

	gulp.src(paths.indexFile)
		.pipe(inject(sources))
		.pipe(gulp.dest(paths.dist));
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

});
