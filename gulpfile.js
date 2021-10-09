var gulp = require("gulp");
var ejs = require("gulp-ejs");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var browserSync = require("browser-sync");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var concat = require('gulp-concat');
var through2 = require('through2');
var runTimestamp = Math.round(Date.now()/1000);
//setting : Pug Options
var pugOptions = {
  pretty: true,
  basedir: 'src/pug'
}

// Sass
gulp.task( "sass", function () {
    return gulp.src( 'src/sass/*.scss' )
        .pipe(plumber())
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe(autoprefixer(['last 3 versions', 'ie >= 8', 'Android >= 4', 'iOS >= 8']))
        .pipe(through2.obj((chunk, enc, callback)=>{
          const date = new Date();
          chunk.stat.atime = date;
          chunk.stat.mtime = date;
          callback(null, chunk);
        }))
        .pipe( gulp.dest( './dist/css' ));
});

// EJS
gulp.task( "ejs", function () {
    return gulp.src(["src/ejs/**/*.ejs", '!' + "src/ejs/**/_*.ejs"])
        .pipe(plumber())
        .pipe(ejs())
        .pipe(rename({extname: ".html"})) //拡張子をhtmlに
        .pipe( gulp.dest( "./dist" ) );
});

//PUG
gulp.task('pug', function () {
    return gulp.src(["src/pug/**/*.pug", '!' + "src/pug/**/_*.pug"])
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(gulp.dest("./dist"));
});

//js
gulp.task('js', function (done) {
    console.log('DEBUG:ここがあやしい');
    gulp.src('src/js/script/**/*.js')
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'));
    gulp.src('src/js/plugin/**/*.js')
    .pipe(plumber())
    .pipe(concat('plugin.js'))
    .pipe(gulp.dest('dist/js'));
    done();
});


gulp.task('iconfonts', function(){
  console.log('DEBUG:ここがあやしい1');
  return gulp.src(['src/icons/*.svg']) // 【A】のパスを指定
    .pipe(iconfont({
      startUnicode: 0xF001,
      fontName: 'iconfont',
      formats: ['ttf', 'eot', 'woff', 'svg'],
      appendCodepoints:false,
      normalize: true,
      fontHeight: 500,
      timestamp: runTimestamp
    }))
 
   .on('glyphs', function(glyphs) {

      gulp.src('src/templates/iconfont.css') // 【B】のパスを指定
      .pipe(consolidate('lodash', {
        glyphs: glyphs.map(function(glyph) {
          return { fileName: glyph.name, codePoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
        }),
        fontName: 'iconfont',
        fontPath: '../fonts/',
        cacheBusterQueryString: '',
        cacheBuster: '',
        timeStamp: Date.now(),
        cssClass: 'icon'
      }))
      .pipe(rename({
        extname: '.scss'
      }))
      .pipe(gulp.dest('src/sass/base'))
      .pipe(rename({
        extname: '.css'
      }))
      .pipe(gulp.dest('dist/css')); // 【D】のパスを指定
    })
 
    .pipe(gulp.dest('dist/fonts')); // 【C】のパスを指定
    console.log('DEBUG:ここがあやしい3');
});

//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./dist/js/**/*.js", ['reload']);
  gulp.watch("./dist/**/*.html", ['reload']);
  gulp.watch("./dist/css/**/*.css", ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

// webserver
gulp.task('webserver', function(){
    gulp.src('dist')
    .pipe(webserver({
        livereload: true,
        open: true,
        port: 8001
    }));
});
var consoleLog = function () {
    console.log(1);
}
// watch
gulp.task('watch', () => {
    gulp.watch( "src/js/**/.js", gulp.series( "js" ));
    gulp.watch( "src/sass/**/*.scss", gulp.series( "sass" ) ); // sassディレクトリ以下の.scssファイルの更新を監視
    gulp.watch( "src/ejs/**/*.ejs", gulp.series( "ejs" ) ); // ejsディレクトリ以下の.ejsファイルの更新を監視
    gulp.watch( "src/pug/**/*.pug", gulp.series( "pug" ) ); // ejsディレクトリ以下の.ejsファイルの更新を監視
});

// 監視　※gulp4の書き方です。
gulp.task( "default",
        gulp.parallel('webserver','watch'),
);
