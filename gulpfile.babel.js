import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import del from 'del';
import glob from 'glob';
import path from 'path';
// import { exec } from 'child_process';

import webpack from 'webpack-stream';
import {optimize} from 'webpack';
import webpackConfig from './webpack.config.babel';

import pkg from './package.json';

const paths = {
    allSrc: 'src/**/*.{js,jsx,scss,sass}',
    allSrcJs: 'src/**/*.js?(x)',
    allSrcStyles: 'src/**/*.?(s)css',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    testJs: 'src/test/**/*.js',
    clientEntryPoint: 'src/client/app.js', // webpack 单入口
    clientEntryPoints: getEntryPaths(), // webpack 多入口
    clientBundle: 'dist/client-bundle.js?(.map)',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    libDir: 'lib',
    distDir: 'dist',
    testDir: 'src/test'
};

function getEntryPaths() {
    return glob.sync('/**/main.js', {
        root: path.resolve('./src/client/pages'),
    });
}

function getEntries() {
    const arr = paths.clientEntryPoints;
    const ret = {
        app: path.resolve('./src/client/app.js') //'./src/client/app.js'
    };
    arr.forEach(function (path) {
        let key = path.replace(/^.*pages\/([a-zA-Z0-9_-]+)\/main\.js$/, '$1');
        if (key) {
            ret[key] = path;
        }
    });
    console.log(ret);
    return ret;
}

webpackConfig.entry = getEntries();
console.log(webpackConfig);

gulp.task('readyProd', () => {
    delete webpackConfig.devtool;
    webpackConfig.entry['vendor'] = Object.keys(pkg.dependencies);
    // webpackConfig.output.chunkFilename = '[name].[chunkhash].min.js';
    webpackConfig.plugins = [
        new optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new optimize.OccurrenceOrderPlugin(),
        // new webpack.NoErrorsPlugin(),
        // 'vendor', '[name].js', Infinity
        new optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkHash].js',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource
                    && /\.js$/.test(module.resource)
                    && module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
                )
            },
            // chunks: ['vendor']
            // chunks: Object.keys(webpackConfig.entry)
        })
    ];
    console.log(webpackConfig);
});

gulp.task('clean', () => {
    return del([
        paths.libDir,
        paths.distDir
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

gulp.task('main', ['clean'], () => {
    return gulp.src(paths.clientEntryPoints)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
});

gulp.task('watch', () => {
    gulp.watch(paths.allSrc, ['main']);
});

gulp.task('test', () => {
    gulp.src(paths.testJs)
        .pipe(mocha())
});

gulp.task('default', ['watch', 'main']);

gulp.task('prod', ['main', 'readyProd']);
