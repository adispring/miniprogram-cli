const gulp = require('gulp');
const babel = require('gulp-babel');
const through = require('through2');
const path = require('path');

const gulpEsbuild = require('gulp-esbuild');

const tsconfigPath = path.resolve(__dirname, '../tsconfig.json');
console.log('tsconfigPath', tsconfigPath);

const exampleOnResolvePlugin = {
  name: 'esbuild-path-alias',
  setup(build) {
    let path = require('path');

    console.log('build', build);
    // Redirect all paths starting with "@/" to "./src/images/"
    build.onResolve({ filter: /./ }, (args) => {
      console.log('onResolve', args);
      // return { path: path.join(args.resolveDir, 'src', args.path) };
    });
  },
};

function esbuild() {
  return gulp
    .src('./src/**/*.ts')
    .pipe(
      gulpEsbuild({
        loader: {
          '.ts': 'ts',
        },
        format: 'esm',
        tsconfig: tsconfigPath,
        plugins: [exampleOnResolvePlugin],
        outdir: 'dist',
      }),
    )
    .pipe(gulp.dest('./dist'));
}

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
        ],
      }),
    )
    .pipe(gulp.dest(distPath));
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
  // gulp.watch(tsFiles, ts);
};
