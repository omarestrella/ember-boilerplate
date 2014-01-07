var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var hbs = require('ember-template-compiler');
var es6 = require('es6-module-transpiler');
var es = require('event-stream');

function transpile () {
    function modifyContents(file, cb) {
        var contents = file.contents;
        var compiler = new es6.Compiler(String(contents));
        file.contents = new Buffer(compiler.toGlobals());

        // First argument is an error if one exists
        // Second argument is the modified file object
        cb(null, file);
    }

    return es.map(modifyContents);
}

function handlebars () {
    function modifyContents(file, cb) {
        var contents = file.contents;
        var compiled = hbs.precompile(String(contents)).toString();
        var name = file.path.split('templates/')[1].split('.hbs')[0]; // I'm lazy...
        file.contents = new Buffer('Ember.TEMPLATES["' + name + '"] = Ember.Handlebars.template(' + compiled + ');');

        cb(null, file);
    }

    return es.map(modifyContents);
}

var thirdPartyJSFiles = [
    'app/lib/jquery/jquery.js',
    'app/lib/handlebars/handlebars.js',
    'app/lib/ember/ember.js',
    'app/lib/ember-data/index.js',
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

gulp.task('default', function () {
    gulp.run('appScripts', 'libScripts', 'templates', 'less');

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