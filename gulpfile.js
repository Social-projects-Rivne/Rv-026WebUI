const gulp = require('gulp4');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const webpackconfig = require('./webpack2.config.js');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('bs:init', (done) => {
    browserSync.init({
        proxy: 'http://localhost:3090',
    });
    done();
});

gulp.task('copy', (done) => {
    gulp.src([
        './public/**/*.*',
        './static/fonts/**/*.*',
        './index.html'], { base: '.', since: gulp.lastRun('copy') })
        .pipe(gulp.dest('dist/'));
    done();
});

gulp.task('sass', (done) => {
    gulp.src(['./static/sass/**/*.scss'], { since: gulp.lastRun('sass') })
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/static/css'));
    done();
});

gulp.task('translate', (done) => {
    gulp.src([
        './controllers/**/*.*',
        './db/**/*.*',
        './helpers/**/*.*',
        './models/**/*.*',
        './routes/**/*.*',
        './app.js',
        './config.js'], { base: '.', since: gulp.lastRun('translate') })
       .pipe(babel({
           presets: ['react', 'es2015', 'stage-1'],
       }))
       .pipe(gulp.dest('dist/'));
    done();
});

gulp.task('startWebpack', (done) => {
    gulp.src('./static/js/index.js')
    .pipe(webpack(webpackconfig))
    .pipe(gulp.dest('dist/'));
    done();
});

gulp.task('start', (done) => {
    let started = false;
    nodemon({
        script: 'dist/app.js',
    })
    .on('start', () => {
        if (!started) {
            done();
            started = true;
        }
    })
    .on('restart', () => {
        setTimeout(() => {
            reload({
                stream: false,
            });
        }, 1000);
    });
    done();
});
gulp.task('reload', (done)=>{
    reload({
                stream: false,
            });
    done();
});
gulp.task('watch', (done) => {
    //gulp.watch('dist/**/*.*').on('change', browserSync.reload);
    gulp.watch([
        './static/sass/**/*.*'], gulp.series('sass'));
    gulp.watch('./dist/static/css/*.*', gulp.series('reload'));
    gulp.watch([
        './controllers/**/*.*',
        './db/**/*.*',
        './helpers/**/*.*',
        './models/**/*.*',
        './routes/**/*.*',
        './app.js',
        './config.js'], gulp.series('translate'));

    gulp.watch([
        './public/**/*.*',
        './static/fonts/**/*.*',
        './index.html'], gulp.series('copy'));
    done();
});

gulp.task('nodemon:start', gulp.series('start', 'bs:init', 'watch'), (done) => {
    done();
});

gulp.task('default',
    gulp.parallel('sass', 'translate', 'copy', 'startWebpack'),
    (done) => {
        done();
    }
);
