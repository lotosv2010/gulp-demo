const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(dest('dist'));
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

module.exports = {
  style,
  script
}