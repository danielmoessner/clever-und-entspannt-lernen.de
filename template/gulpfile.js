'use strict';
const { src, series, parallel, dest, task, watch } = require( 'gulp' );
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const npmDist = require('gulp-npm-dist');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const minify = require('gulp-html-minifier');

// paths
var paths = {
	base: {
		node: 'node_modules',
		app: 'app'
	},
	css: {
		base: 'app/css',
		src: 'app/css/src/**/*.scss',
		dist: 'app/css/dist'
	},
	js: {
		base: 'app/js',
		src: 'app/js/src/**/*.js',
		dist: 'app/js/dist'
	},
	html: {
		base: 'app/html',
		src: 'app/html/src/**/*.html',
		dist: 'app/html/dist'
	},
	fonts: {
		base: 'app/fonts'
	},
	img: {
		base: 'app/img'
	},
	libs: {
		base: 'app/libs'
	}
}

// css
function css() {
	return src(paths.css.src)
	    .pipe(sourcemaps.init())
	    .pipe(sass().on('error', sass.logError))
	    .pipe(postcss([require('postcss-flexbugs-fixes')]))
	    .pipe(autoprefixer())
	    .pipe(sourcemaps.write('./'))
    	.pipe(dest(paths.css.dist));
}

function cssFast() {
	return src(paths.css.src)
	    .pipe(sourcemaps.init())
	    .pipe(sass().on('error', sass.logError))
	    .pipe(sourcemaps.write('./'))
    	.pipe(dest(paths.css.dist));
}

function cssBuild() {
	return src(paths.css.src)
	    .pipe(sass().on('error', sass.logError))
	    .pipe(postcss([require('postcss-flexbugs-fixes')]))
	    .pipe(autoprefixer())
	    .pipe(cleanCss())
	    .pipe(dest(paths.css.dist));
}

// js
function js() {
	return src(paths.js.src)
		.pipe(sourcemaps.init())
		.pipe(concat('quick-website.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(paths.js.dist));
}

function jsBuild() {
	return src(paths.js.src)
		.pipe(concat('quick-website.js'))
		.pipe(uglify())
		.pipe(dest(paths.js.dist));
}

// html
function htmlBuild() {
	return src(paths.html.src)
		.pipe(minify({
			'collapseWhitespace': true,
			'minifyCSS': true,
			'removeComments': true,
			'minifyJS': true
		}))
		.pipe(dest(paths.html.dist));
}

// libs
function libs() {
	return src(npmDist({
		excludes: [
			'sandbox/**/*',  // exclude imagesloaded/sandbox stuff because of conflicts with django ManifestStaticFilesStorage
			'**/*test*/**',
			'**/*demo*/**',
			'*.rb',
			'*.txt',
			'*.json',
			'*.zip',
			'*.html',
			'*upfile',
			'*.png'
		]
	}), {
		base: paths.base.node
	})
	.pipe(dest(paths.libs.base));
}

// clean
function clean() {
	return del([
		paths.libs.base,
		paths.css.dist,
		paths.js.dist,
		paths.html.dist
	]);
}

// exports
exports.clean = clean;
exports.libs = libs;
exports.default = parallel(series(cssFast, () => watch(paths.css.src, cssFast)), series(js, () => watch(paths.js.src, js)));
exports.build = series(clean, parallel(libs, htmlBuild, cssBuild, jsBuild));
