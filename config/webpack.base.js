let path = require('path');
let glob = require('glob');

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

module.exports = {
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
    devtool: '#inline-source-map', // easy to breakpoint
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
        }, {
            test: /\.s[ac]ss$/,
            loader: 'style!css!postcss-loader!sass-loader',
            exclude: [/node_modules/],
        }],
    },

    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, '../src/client/components'),
            containers: path.resolve(__dirname, '../src/client/containers'),
            actions: path.resolve(__dirname, '../src/client/actions'),
            reducers: path.resolve(__dirname, '../src/client/reducers'),
        }
    },
    // plugins: [
    //     new webpack.optimize.OccurrenceOrderPlugin(),
    //     new webpack.NoErrorsPlugin(),
    //     new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    // ]
}
