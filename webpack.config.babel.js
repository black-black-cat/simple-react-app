import path from 'path';

export default {
    output: {
        path: '/dist',
        filename: '[name].js',
    },
    devtool: '#eval',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, 'src/client/components'),
            containers: path.resolve(__dirname, 'src/client/containers'),
            actions: path.resolve(__dirname, 'src/client/actions'),
            reducers: path.resolve(__dirname, 'src/client/reducers'),
        }
    },
};
