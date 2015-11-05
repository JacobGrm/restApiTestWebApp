var CONFIG = {
  src: './src',
  babel: './src/babel',
  dist: './dist',
  temp: './.tmp',
  app: './',
  css: './app/css',
  em: './em-components',
  bower: '../bower_components'
};



var path = require('path');
var fs = require('fs');
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  zip = require('gulp-zip'),
  cssfont64 = require('gulp-cssfont64'),
  install = require('gulp-install'),
  mocha = require('gulp-mocha'),
  jade = require('jade'),
  gulpJade = require('gulp-jade'),
  merge = require('merge-stream'),
  polybuild = require('polybuild'),
  del = require('del'),
  runSequence = require('run-sequence'),
  exec = require('child_process').exec,
  crisper = require('gulp-crisper'),
  fs = require('fs'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  babel = require('gulp-babel'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  vulcanize = require('gulp-vulcanize'),
  pkg = JSON.parse(fs.readFileSync('package.json')),
  minifyCss = require('gulp-minify-css'),
  autoprefixer = require('autoprefixer'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util');



require('require-dir')('./tasks');


// TODO: Clean bower_components for production
gulp.task('clean-bower', function() {
  return gulp.src('bower_components', {
    read: false
  }).pipe($.clean());
});

// TODO: bower install --production
gulp.task('bower', function() {
  return gulp.src(['./bower.json']).pipe(install({
    production: true
  }));
});

// TODO: Create zip
gulp.task('archive', function() {
  return gulp.src('./dist/**/*.*')
    .pipe(zip(pkg.name + '.zip'))
    .pipe(gulp.dest('.'));
});



// TODO: LIVE reload
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};
gulp.task('connect', function() {
  connect.server({
    port: 9393,
    root: [
      './dist',
    ],
    middleware: function(connect) {
      return [
        mountFolder(connect, '.tmp'),
        mountFolder(connect, 'bower_components'),
        mountFolder(connect, '.')
      ];
    },
    livereload: true
  });
});
gulp.task('connect-dist', function() {
  connect.server({
    root: [
      CONFIG.dist,
    ],
    keepalive: true
  });
});


gulp.task('html', function() {
  gulp.src('./dist/*.html').pipe(connect.reload());
  gulp.src('./demo/**/*.html').pipe(connect.reload());
});

gulp.task('watch', function() {

  gulp.watch('./demo/**/*.html', ['html']);
  gulp.watch('./dist/*.js', ['docs']);
  gulp.watch('./src/jade/*.jade', ['compile-templates']);
  gulp.watch('./src/scss/*.scss', ['compile-styles']);
  gulp.watch('./src/**/*.js', ['compile-js']);
  gulp.watch('./src/**/*.html', ['compile-elements']);
});

gulp.task('docs', function() {
  gulp.src(['./src/**/*.js', 'README.md']);
});

gulp.task('clean', function(cb) {
  return del(['.tmp', 'dist'], cb);
});

gulp.task('copy', function() {
  var elements = gulp.src(['src/elements/**/*.*'])
    .pipe(gulp.dest('demo/elements'));

  var bower = gulp.src(['bower_components/**/*.*'])
    .pipe(gulp.dest('dist/bower_components'));

  return merge(elements, bower);
});

// TODO: Base64 encode fonts
gulp.task('compile-fonts', function() {
  return gulp.src('./src/fonts/*.ttf')
    .pipe(cssfont64())
    .pipe(gulp.dest('./dist/css'));
});

// Build production files, the default task
gulp.task('dist', function(cb) {
  runSequence(
    'clean',
    'copy', [
      'compile-fonts',
      'compile-templates',
      'compile-styles'
    ],
    'compile-js',
    'compile-elements',
    cb);
});

gulp.task('test', ['test-js']);
gulp.task('default', ['connect', 'watch']);
gulp.task('serve:dist', ['dist', 'connect-dist']);
