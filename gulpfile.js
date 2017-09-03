var gulp      = require('gulp');
var insert      = require('gulp-insert');
var sass        = require('gulp-sass');
var runSequence = require('run-sequence');
var $           = require('gulp-load-plugins')();


gulp.task('sass', function () {

    gulp.src('app/styles/global.scss')
        .pipe(sass())
        .pipe(gulp.dest("app/styles"))

    

    gulp.src(['app/styles/scss/skins/default/color-vars-body.scss','app/styles/scss/skins/default/colors.scss'])
        .pipe(sass())
        .pipe(gulp.dest("app/styles/scss/skins/default"))

});

gulp.task('copy', function(){

    var colorVars = gulp.src('app/styles/scss/skins/default/color-vars-body.css')
        .pipe($.rename('color-vars.css'))
        .pipe(gulp.dest('app/styles/scss/skins/default'));

    return colorVars;
});

gulp.task('insert', function(){
    gulp.src(['app/styles/scss/skins/default/color-vars.css'])
        .pipe(insert.append('</style>'))
        .pipe(insert.prepend('<style is=\'custom-style\'>'))
        .pipe(gulp.dest('app/styles/scss/skins/default/'));
});

gulp.task('default',  function (cb) {
    runSequence(
        ['sass', 'copy'],
        ['insert'],
        cb)
});