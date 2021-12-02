// 설치방법
/*
1. node.js 최신 LTS 버전 설치
2. 해당 프로젝트 폴더를 vscode 로 열고 터미널(Ctrl + `)을 열어서 명령어 실행
3. npm init
4. npm install --global gulp-cli
5. npm install --save-dev gulp gulp-sass merge-stream gulp.spritesmith-multi gulp-sourcemaps gulp-autoprefixer del browser-sync
*/

const gulp = require('gulp'),
	scss = require('gulp-sass'),
	merge = require('merge-stream'),
	spritesmith = require('gulp.spritesmith-multi'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	// cleanCSS = require('gulp-clean-css'),
	// rename = require('gulp-rename'),
	// purgecss = require('gulp-purgecss'),
	del = require('del'),
	browserSync = require('browser-sync').create();

/*
 * ==============================+
 * @SCSS : SCSS Config(환경설정)
 * ==============================+
 */
function clean_sprites() {
	return del('./assets/images/sprites');
}
function auto_sprite() {
	var now = new Date();
	var today = now.getFullYear()+'/'+now.getMonth()+1+'/'+now.getDate();
	var opts = {
		spritesmith: function (options, sprite, icons) {
			options.imgPath = `../images/sprites/${options.imgName}?ver=${today}`;
			options.retinaImgPath = `../images/sprites/${options.retinaImgName}?ver=${today}`;
			options.cssName = `_${sprite}-sprite.scss`;
			options.cssTemplate = null;
			options.cssSpritesheetName = sprite;
			options.padding = 10;
			options.cssVarMap = function (sp) {
				sp.name = `${sprite}-${sp.name}`;
			};

			return options;
		},
	};
	var spriteData = gulp
		.src('./_build/img-sprites/**/*.png')
		.pipe(spritesmith(opts))
		.on('error', function (err) {
			console.log(err);
		});

	var imgStream = spriteData.img.pipe(gulp.dest('./assets/images/sprites'));
	var cssStream = spriteData.css.pipe(gulp.dest('./assets/scss/sprites'));

	return merge(imgStream, cssStream);
}
function scss_compile() {
	var scssOptions = {
		// Values : nested, expanded, compact, compressed */
		outputStyle: 'compressed',
		linefeed: '',
		// Values: space, tab
		// indentType: 'tab',
		// indentWidth: 1, // outputStyle 이 nested, expanded 인 경우에 사용
		// 컴파일 된 CSS 의 소수점 자리수.
		precision: 6,
		// 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시.
		// sourceComments: true,
	};

	return (
		gulp
			.src('./assets/scss/**/*.scss')
			// 소스맵 초기화(소스맵을 생성)
			.pipe(sourcemaps.init())
			// .pipe(sass().on('error', sass.logError))
			// SCSS 함수에 옵션갑을 설정, SCSS 작성시 watch 가 멈추지 않도록 logError 를 설정
			.pipe(scss(scssOptions).on('error', scss.logError))
			.pipe(autoprefixer())
			// .pipe(cleanCSS({ compatibility: 'ie8' }))
			// 위에서 생성한 소스맵을 사용한다.
			.pipe(sourcemaps.write('./'))
			// .pipe(
			// 	rename(function (path) {
			// 		path.extname = '.min.css';
			// 	})
			// )
			// .pipe(
			// 	purgecss({
			// 		content: ['html/**/*.html'],
			// 	})
			// )
			.pipe(gulp.dest('./assets/css/'))
			.pipe(browserSync.stream())
	);
}

function html() {
	// return gulp.src('./html/**/*.html').pipe(gulp.dest('./public/'));
}

function serve() {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
}

gulp.watch('./_build/img-sprites/**/*.png', auto_sprite);
gulp.watch('./assets/scss/**/*.scss', scss_compile).on('change', browserSync.reload);
gulp.watch('./html/**/*.html', html).on('change', browserSync.reload);

exports.default = gulp.parallel(html, clean_sprites, auto_sprite, scss_compile, serve);
