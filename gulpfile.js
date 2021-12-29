const { series, task, src, dest } = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

task('js', function (done) {
  src(['./index-1.0.1.js', './calendly.js'])
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            '@babel/env',
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./'));
  done();
});

task('default', series('js'));