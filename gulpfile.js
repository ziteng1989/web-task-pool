'use strict';

var gulp = require('gulp');
var fs = require('fs');
var through2 = require('through2');
var cwd = process.cwd();
var babel = require('gulp-babel');
var moment = require('moment');
var colors = require('colors/safe');

var jsFiles = ['src/**/*.js'];

function compileJS(stream) {
  return stream.pipe(babel({
    presets: ['es2015', 'stage-0']
  })).pipe(through2.obj(function (file, encoding, next) {
    file.path = file.path.replace(/src\//, 'lib/');
    console.log(colors.green(file.path));
    this.push(file);
    next();
  })).pipe(gulp.dest(process.cwd())).on('end', function () {
    console.log(colors.green('[' + moment().format("HH:mm:ss") + '] \u7F16\u8BD1\u6210\u529F!!!'));
  });
}

gulp.task('build', function () {
  return compileJS(gulp.src(jsFiles, {
    base: cwd
  }));
});