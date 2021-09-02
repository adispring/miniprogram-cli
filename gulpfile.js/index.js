const gulp = require('gulp');
const babel = require('gulp-babel');
const through = require('through2');

function logBabelMetadata() {
  return through.obj((file, enc, cb) => {
    console.log(file.babel); // 'metadata'
    cb(null, file);
  });
}

const srcPath = 'src/**';
const distPath = 'dist/';
const tsFiles = [`${srcPath}/*.ts`];
console.log(tsFiles);

// copy ts
function ts() {
  return gulp
    .src(tsFiles)
    .pipe(
      babel({
        // plugin that sets some metadata
        plugins: [
          '@babel/plugin-transform-typescript',
          [
            'module-resolver',
            {
              root: ['./'],
              alias: {
                utils: './src/utils',
                '@': './src',
              },
            },
          ],
          {
            post(file) {
              // console.log(file);
              file.metadata.test = 'metadata';
            },
          },
        ],
      }),
    )
    .pipe(logBabelMetadata())
    .pipe(gulp.dest(distPath));
  // return gulp.src(tsFiles).pipe(gulp.dest(distPath));
}

function css(cb) {
  console.log('css');
  // body omitted
  cb();
}

exports.default = function () {
  console.log('start dev');
  // You can use a single task
  gulp.watch('src/**/*.scss', css);
  // Or a composed task
  gulp.watch(tsFiles, ts);
};
