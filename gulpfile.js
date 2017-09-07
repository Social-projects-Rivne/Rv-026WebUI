const gulp = require('gulp4');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('bs:init', (done) =>{
    browserSync.init({
        proxy:"http://localhost:3090" 
    })
   done();
})

gulp.task('copy', () => {
    return gulp.src([
        './public/**/*.*',
        './index.html'],{base:'.', since: gulp.lastRun('copy')})
        .pipe(gulp.dest('dist/'));
    
})

gulp.task('translate', () => {
   return gulp.src([
        './controllers/**/*.*',
        './db/**/*.*',
        './helpers/**/*.*',
        './models/**/*.*',
        './routes/**/*.*',
        './app.js',
        './config.js'], {base:'.', since: gulp.lastRun('translate')})
       // .pipe(sourcemaps.init())
       .pipe(babel({
           presets: ["react", "es2015", "stage-1"]
       }))
      // .pipe(sourcemaps.write())
       .pipe(gulp.dest('dist'))
})

gulp.task('startWebpack', (done) => {
     return gulp.src('./static/js/index.js')
    .pipe(webpack(require('./webpack2.config.js') ))
    .pipe(gulp.dest('dist/'));
    done();
})

gulp.task('start', (done) =>{

    var started = false;
    
	return nodemon({
        script: 'dist/app.js'
    })
    .on('start', () => {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			done();
			started = true; 
        }
    })
    .on('restart', () => {
        setTimeout( () => {
            reload({
                stream: false
            });
        }, 1000);
      });
})

gulp.task('watch', (done) => {
    browserSync.watch("dist/**/*.*").on("change", reload);
    
    gulp.watch([
        './controllers/**/*.*',
        './db/**/*.*',
        './helpers/**/*.*',
        './models/**/*.*',
        './routes/**/*.*',
        './app.js',
        './config.js'],gulp.series('translate'));
    
    gulp.watch([
            './public/**/*.*',
            './index.html'],gulp.series('copy'));
    done();
})

gulp.task('nodemon:start', gulp.series('start', 'bs:init','watch') , (done) =>
{
    done();
} )

gulp.task('default',
    gulp.parallel('translate', 'copy', 'startWebpack')
);


