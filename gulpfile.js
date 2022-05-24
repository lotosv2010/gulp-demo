const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const swig = require('gulp-swig');
const imagemin = require('gulp-imagemin');
const del = require('del');

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

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

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(swig({ data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const clean = () => {
  return del(['dist', 'temp'])
}

const compile = parallel(style, script, page, image, font);

// 上线之前执行的任务
const build = series(
  clean,
  parallel(
    extra,
    compile
  )
);

module.exports = {
  compile,
  build
}