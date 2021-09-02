const gulp = require('gulp');

const srcPath = 'miniprogram/**';
const distPath = 'dist/';
const tsFiles = [`${srcPath}/*.ts`];
console.log(tsFiles);

// copy ts
function ts() {
  return gulp.src(tsFiles).pipe(gulp.dest(distPath));
}

function css(cb) {
  console.log('css');
  // body omitted
  cb();
}

exports.default = function () {
  console.log('start dev');
  // You can use a single task
  gulp.watch('miniprogram/**/*.scss', css);
  // Or a composed task
  gulp.watch(tsFiles, ts);
};
