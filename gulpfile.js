const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack= require('webpack-stream');


gulp.task('copy', () =>{
    gulp.src(
        'public/**/*.*',
        'bundle.js',
        'index.html')
})

gulp.task('translate', () =>{
    gulp.src(
        'controllers/**/*.*',
        './db/**/*.*',
        'helpers/**/*.*',
        'models/**/*.*',
        'public/**/*.*',
        'routes/**/*.*',
        'app.js',
        'config.js')
       .pipe(babel({
           presets: ["react", "es2015", "stage-1"]
       }))
       .pipe(gulp.dest('dist'))
})

gulp.task('startWebpack', () =>{
     return gulp.src('./static/js/index.js')
    .pipe(webpack(require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
})


gulp.task('default', ['translate', 'copy', 'startWebpack'], () => {});