'use strict';

require('babel/register');
var SERVER_PORT = 8585;

var CONFIG = {
  src: './app',
  babel: './app/scripts',
  dist: './dist',
  temp: './.tmp',
  app: './app',
  css: './app/styles',
  bower: '../bower_components'
};

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


var fs = require('fs');
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  zip = require('gulp-zip'),
  cssfont64 = require('gulp-cssfont64'),
  install = require('gulp-install'),
  merge = require('merge-stream'),
  del = require('del'),
  runSequence = require('run-sequence').use(gulp),
  fs = require('fs'),
  pkg = JSON.parse(fs.readFileSync('package.json')),
  connect = require('gulp-connect'),
  polybuild = require('polybuild'),
  fs = require('fs'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  through = require('through2'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  jade = require('jade'),
  jadeBabel = require('jade-babel'),
  gulpJade = require('gulp-jade'),
  gutil = require('gulp-util');



// TODO: LIVE reload
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

function compile(watch) {
  var bundler = watchify(browserify(CONFIG.src + '/scripts/main.js', {
    debug: true
  }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source(pkg.name + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest(CONFIG.dist));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}


function babelCompiler(src, renamer) {
  return gulp
    .src(src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      optional: ['runtime']
    }))
    .pipe(renamer ? require('gulp-rename')(renamer) : require('gulp-util').noop())
    .pipe(sourcemaps.write());
}

//Compile al .es6 to es5
function babelifyCode() {
  return babelCompiler(CONFIG.src + '/scripts/**/*', {
      extname: '.js'
    })
    .pipe(gulp.dest(CONFIG.dist + '/scripts'));
}

function browserifyCode() {
  return browserify({
      debug: true
    })
    .transform(babelify)
    .require(CONFIG.src + '/scripts/main.js', {
      entry: true
    })
    .bundle()
    .on('error', function(err) {
      console.log('Error:' + err.message);
    })
    .pipe(fs.createWriteStream(CONFIG.dist + '/' + pkg.name + '.js'))
    //.pipe($.rename(pkg.name + '.js'))
    //.pipe(gulp.dest('./dist/'));
}
/* =========================================
    Tasks
========================================= */



gulp.task('compile', function() {
  return compile();
});
gulp.task('compile-watch', function() {
  return watch();
});
gulp.task('browserify', function() {
  return browserifyCode();
});
gulp.task('babelify', function() {
  return babelifyCode();
});

gulp.task('compile-all-js', ['browserify', 'babelify']);
gulp.task('compile-js', ['babelify']);
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

gulp.task('connect', function() {
  connect.server({
    port: SERVER_PORT,
    root: [
      './app',
    ],
    middleware: function(connect) {
      return [
        mountFolder(connect, '.tmp'),
        mountFolder(connect, './dist')
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
  gulp.src('./.tmp/*.html').pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./dist/*.js', ['docs']);
  gulp.watch('./app/**/*.jade', ['compile-templates']);
  gulp.watch('./app/styles/*.scss', ['compile-styles']);
  gulp.watch('./app/scripts/**/*.js', ['compile-js']);
  gulp.watch('./app/elements/**/*.html', ['compile-elements']);
});

gulp.task('docs', function() {
  gulp.src(['./app/**/*.js', 'README.md']);
});

gulp.task('clean', function(cb) {
  return del(['.tmp', 'dist'], cb);
});

gulp.task('copy', function() {
  var elements = gulp.src(['app/elements/**/*.*'])
    .pipe(gulp.dest('dist/elements'));

  var bower = gulp.src(['app/bower_components/**/*.*'])
    .pipe(gulp.dest('dist/bower_components'));

  var bower = gulp.src(['app/spec/**/*.*'])
    .pipe(gulp.dest('dist/spec'));

  return merge(elements, bower);
});

// TODO: Base64 encode fonts
gulp.task('compile-fonts', function() {
  return gulp.src('./app/fonts/*.ttf')
    .pipe(cssfont64())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('compile-elements', function() {
  return gulp.src('app/elements/elements.html')
    .pipe(polybuild({
      maximumCrush: false
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch-elements', function() {

});


gulp.task('images', function() {
  return gulp.src('./app/images/**/*')
    .pipe(gulp.dest('./dist/images'))
    .pipe($.size({
      title: 'images'
    }));
});

gulp.task('sass', function() {
  return gulp.src('./app/styles/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./.tmp/'));
  //.pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
  //.pipe(postcss([autoprefixer(AUTOPREFIXER_BROWSERS)]))
  //.pipe($.rename('.css'))

});

gulp.task('prefixer', function() {
  return gulp.src([
      './.tmp/**/*.css'
    ])
    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))
    //.pipe(minifyCss())
    //.pipe($.cssmin())
    //.pipe($.rename(pkg.name + '.min.css'))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('compile-styles', function(cb) {
  runSequence(['images'], 'sass', 'prefixer', cb);
});

// TODO: Test es6
gulp.task('mocha', function(cb) {
  return gulp.src('test/specs/**/*-spec.js', {
      read: false
    })
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe($.mocha({
      timeout: 4000,
      //require: ['dist/px-mobile.js'],
      reporter: 'mocha-lcov-reporter'
    }))
    .once('error', function() {
      console.log('ERROR');
      console.error(arguments);
      cb();
      process.exit(1);
    })
    .once('end', function() {
      console.log('END');
      console.error(arguments);
      cb();
      process.exit();
    });
});


gulp.task('test-js', ['mocha']);

jade.filters.babel = jadeBabel({});
gulp.task('js-templates', function() {
  return gulp.src('./app/*.jade')
    .src('./app/views/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      client: true
    }))
    .pipe(gulp.dest('./.tmp/scripts'));
});

gulp.task('html-templates', function() {
  var index = gulp.src('./app/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'));

  var views = gulp.src('./app/views/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./dist/views'));

  return merge(index, views);
});

gulp.task('compile-templates', [
  'html-templates'
]);
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

gulp.task('test', ['test-elements', 'test-js']);
gulp.task('default', function(cb) {
  runSequence('dist', 'connect', 'watch', cb);
});
gulp.task('serve:dist', ['dist', 'connect-dist']);
