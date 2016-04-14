var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback')


/*
  Styles Task
*/
gulp.task('css', function () {
  return gulp.src('./css/style.css')
      .pipe( sourcemaps.init() )
      .pipe( postcss([
        require('postcss-import'),
        require('postcss-cssnext')
        ]) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('./') );
});


/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server : {},
        middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./js/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform:  [babelify.configure({stage : 0 })]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('build', function() {
  return buildScript('main.js', false); // this will run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['css','build','browser-sync'], function() {
  gulp.watch('css/*', ['css']); // gulp watch for styles changes
  return buildScript('main.js', true); // browserify watch for JS changes
});
