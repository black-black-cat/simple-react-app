module.exports = {
    plugins: [
        // require('postcss-smart-import')({ /* ...options */ }),
        // require('precss')({ /* ...options */ }),
        require('autoprefixer')({browsers: ['last 6 version', 'ie >= 10']})
    ]
};
