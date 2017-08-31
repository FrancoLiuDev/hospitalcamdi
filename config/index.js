const PUBLISH_ENV = 'AUTO'
const SERVICE_DEV_ROOT = '60.251.125.208:23000'

function getServiceParam() {

    var param = {
        service_root: ''
    };

    if (PUBLISH_ENV === 'DEV')
        param.service_root = 'http://' + process.env.API_PORT_25000_TCP_ADDR + ':' + process.env.API_PORT_25000_TCP_PORT
    else if (PUBLISH_ENV === 'AUTO') {
        console.log('API_PORT_25000_TCP_ADDR', process.env.API_PORT_25000_TCP_ADDR)


        if (process.env.API_PORT_25000_TCP_ADDR && process.env.API_PORT_25000_TCP_PORT)
            param.service_root = 'http://' + process.env.API_PORT_25000_TCP_ADDR + ':' + process.env.API_PORT_25000_TCP_PORT

        else
            param.service_root = 'http://' + SERVICE_DEV_ROOT
    } else if (PUBLISH_ENV === 'PROD') {
        param.service_root = 'http://' + process.env.API_PORT_25000_TCP_ADDR + ':' + process.env.API_PORT_25000_TCP_PORT
    }
    return param;
}

var path = require('path')
var parm = getServiceParam()
var url = parm.service_root

console.log('Proxy Url', url)
module.exports = {

    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: url,
                changeOrigin: true,
                pathRewrith: {
                    '^/api': '/api'
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}