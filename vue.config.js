module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            // '/': {
            //     target: 'http://193.112.145.172:8068',
            //     changeOrigin: true
            // }
            '/': {
                target: 'http://localhost:8068',
                changeOrigin: true
            }
        },
    },
    assetsDir: 'static',
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [ 'D:\\码云\\pigcount\\static\\style\\home.less' ]
        }
    }
};
