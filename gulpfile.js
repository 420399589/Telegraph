const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require("gulp-htmlmin");
const htmlclean = require("gulp-htmlclean");

let minifyHTML = () => {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(htmlclean())
        .pipe(gulp.dest('dist'));
}

let minifyJS = () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            "presets": [
                ["@babel/env", {
                    "targets": [
                        'last 2 versions',
                        'since 2015',
                        '> 1%',
                        'Chrome >= 30',
                        'Firefox >= 30',
                        'ie >= 9',
                        'Safari >= 9',
                    ]
                }]
            ]
        }))
        .pipe(uglify({
            keep_fnames: false
        }))
        .pipe(gulp.dest('dist'));
}

exports.minifyHTML = minifyHTML;
exports.minifyJS = minifyJS;

gulp.task('build', gulp.parallel(
    minifyHTML,
    minifyJS
));

gulp.task('default', gulp.parallel('build'));