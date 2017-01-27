import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import glob from 'glob';
import path from 'path';
// import { exec } from 'child_process';

import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.js', // webpack 单入口
    clientEntryPoints: getEntries(), // webpack 多入口
    clientBundle: 'dist/client-bundle.js?(.map)',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    libDir: 'lib',
    distDir: 'dist',
};

function getEntries() {
    var arr = glob.sync('/**/main.js', {
        root: path.resolve('./src/client/pages'),
    });
    var ret = {};
    arr.forEach(function (path) {
        var key = path.replace(/^.*pages\/([a-zA-Z0-9_-]+)\/main\.js$/, '$1');
        if (key) {
            ret[key] = path;
        }
    });
    console.log(ret);
    return ret;
}

// getEntries();

gulp.task('clean', () => {
    return del([
        paths.libDir,
        paths.clientBundle,
    ]);
});

gulp.task('build', ['clean'], () => {
    return gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir));
});

// gulp.task('main', ['build'], (callback) => {
//   exec(`node ${paths.libDir}`, (error, stdout) => {
//     console.log(stdout);
//     return callback(error);
//   });
// });

gulp.task('main', ['clean'], () =>
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
