let path = require('path');
let glob = require('glob');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let htmlPlugins = [];

const paths = {
    clientEntryPoint: 'src/client/app.js', // webpack 单入口
    clientEntryPoints: getEntryPaths() // webpack 多入口
};

function getEntryPaths() {
    let dir = path.resolve(__dirname, '../src/client/pages/**/main.js')
    return glob.sync(dir, {
        // cwd: process.cwd() // default 使用 npm scripts 时，是package.json所在目录
        // root: path.resolve(options.cwd, "/") // default
    });
}

function getEntries() {
    let nodePath = path;
    const arr = paths.clientEntryPoints;
    console.log(arr);
    const ret = {
        app: path.resolve('./src/client/app.js') //'./src/client/app.js'
    };
    arr.forEach(function (path) {
        let key = path.replace(/^.*pages\/([a-zA-Z0-9_\-\/]+)\/main\.js$/, '$1');
        if (key) {
            ret[key] = path;

            // 每个页面生成一个html
            var plugin = new HtmlWebpackPlugin({
                // 生成出来的html文件名
                filename: key + '.html',
                // 每个html的模版，这里多个页面使用同一个模版
                template: nodePath.resolve(__dirname, '../index.html'),
                // 自动将引用插入html
                inject: true,
                // 每个html引用的js模块，也可以在这里加上vendor等公用模块
                chunks: [key],
                favicon: 'favicon.ico'
            });
            htmlPlugins.push(plugin);
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
        publicPath: '/'
    },
    devtool: '#inline-source-map', // easy to breakpoint
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: [/node_modules/]
        }, {
            test: /\.s[ac]ss$/,
            loader: 'style!css!postcss-loader!sass-loader',
            exclude: [/node_modules/]
        }, {
            test: /\.(png|jpe?g|gif)/,
            loader: 'url-loader?limit=0&name=images/[hash:9].[name].[ext]?v=[hash:6]'
        }]
    },

    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, '../src/client/components'),
            containers: path.resolve(__dirname, '../src/client/containers'),
            actions: path.resolve(__dirname, '../src/client/actions'),
            reducers: path.resolve(__dirname, '../src/client/reducers')
        }
    },

    plugins: [
        // new CleanWebpackPlugin(['dist'], {
        //     root: process.cwd(),
        //     verbose: true,
        //     dry: false,
        //     exclude: ['shared.js']
        // })
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    ].concat(htmlPlugins),

    devServer: {
        inline: true,
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 9000,

        contentBase: path.join(__dirname, "../"),
        inline: true,
        host: 'localhost',
        port: 8009,
        hot: true,
        open: true
    }
};
