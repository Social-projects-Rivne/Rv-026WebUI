const gulp = require('gulp4');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');


gulp.task('copy', () => {
    return gulp.src([
        './public/**/*.*',
        './index.html'],{base:'.', sinse:gulp.lastRun('copy')})
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
        './config.js'], {base:'.', sinse:gulp.lastRun('translate')})
       // .pipe(sourcemaps.init())
       .pipe(babel({
           presets: ["react", "es2015", "stage-1"]
       }))
      // .pipe(sourcemaps.write())
       .pipe(gulp.dest('dist'))
})

gulp.task('startWebpack', () => {
     return gulp.src('./static/js/index.js')
    .pipe(webpack(require('./webpack2.config.js') ))
    .pipe(gulp.dest('dist/'));
})

gulp.task('start', () =>{
    var stream = nodemon({script: 'dist/app.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
})
    stream
    .on('restart', function () {
      console.log('restarted!')
    })
    .on('crash', function() {
      console.error('Application has crashed!\n')
       stream.emit('restart', 10)  // restart the server in 10 seconds 
    })
})

gulp.task('watch', () => {
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
})

gulp.task('nodemon:start', gulp.parallel('start', 'watch') )

gulp.task('default',gulp.series(
    gulp.parallel('translate', 'copy', 'startWebpack')
));


