module.exports = {
    outputDir: 'pigcount',
    publicPath: './',
    devServer: {
        proxy: {
            // '/': {
            //     target: 'http://36.111.183.168:8068',
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
