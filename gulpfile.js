var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var connect = require('connect');

var transpile = require('./plugins/gulp-transpile');
var handlebars = require('./plugins/gulp-handlebars');

var thirdPartyJSFiles = [
    'app/lib/almond/almond.js',
    'app/lib/jquery/jquery.js',
    'app/lib/handlebars/handlebars.js',
    'app/lib/ember/ember.js',
    'app/lib/ember-data/ember-data.js',
    'app/lib/lodash/dist/lodash.js'
];

var appJSFiles = [
    'app/js/**/*.js'
];

var appTemplateFiles = [
    'app/templates/**/*.hbs'
];

gulp.task('appScripts', function () {
    gulp.src(appJSFiles)
        .pipe(transpile())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('libScripts', function () {
    gulp.src(thirdPartyJSFiles)
        .pipe(concat('thirdparty.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('templates', function () {
    gulp.src(appTemplateFiles)
        .pipe(handlebars())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('less', function () {
    gulp.src('app/less/app.less')
        .pipe(less({
            compress: true
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('build/'));
});

gulp.task('copy', function () {
    gulp.src('app/index.html')
        .pipe(gulp.dest('build/'));
});

gulp.task('connect', function () {
    connect(connect.static('build')).listen(9000);
});

gulp.task('default', function () {
    gulp.run('copy');
    gulp.run('appScripts', 'libScripts', 'templates', 'less');
    gulp.run('connect');

    gulp.watch('app/index.html', function (event) {
        gulp.run('copy');
    });

    gulp.watch('app/js/**/*.js', function (event) {
        gulp.run('appScripts');
    });

    gulp.watch('app/less/**/*.less', function (event) {
        gulp.run('less');
    });

    gulp.watch('app/templates/**/*.hbs', function (event) {
        gulp.run('templates');
    });
});