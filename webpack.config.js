/**
 * @see https://github.com/webpack/react-starter/blob/16c0db3a3bad3cbf611007608339be31fc27bc8b/make-webpack-config.js
 * @see https://webpack.github.io/analyse/
 */
(function() {

    function isDevServer() {
        return process.argv.some(function(arg) {
            return arg.indexOf('webpack-dev-server') > -1;
        });
    }

    var webpack = require('webpack'),
        path = require('path'),
        utils = require('./webpack.utils'),
        host = 'localhost',
        port = 5000,
        server = 'http://' + host + ':' + port,
        hmr = isDevServer(),
        StatsPlugin = require("stats-webpack-plugin"),
        excludeFromStats = [
            /node_modules[\\\/]react(?!-router|-bootstrap|-router-bootstrap)?[\\\/]/,
            /node_modules[\\\/]items-store[\\\/]/
        ];

    process.env.NODE_ENV = hmr ? 'production' : 'dev-server';

    console.log('Mode:', isDevServer() ? 'DEVELOPMENT HMR' : 'PRODUCTION BUILD');

    module.exports = {
        debug: hmr,
        devtool: hmr ? 'eval' : '#source-map',
        entry: {
            'render': ['./src/demo/render']
        },
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: 'build',
            sourcePrefix: '',
            filename: '[name].js' + (hmr ? '' : '?[chunkhash]'),
            chunkFilename: hmr ? '[id].js' : '[name].js?[chunkhash]',
            pathinfo: !hmr
        },
        target: 'web',
        plugins: (hmr ? [
            new webpack.NoErrorsPlugin()
        ] : [
            new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}}),
            new StatsPlugin('webpack-build-statistics.json', {chunkModules: true})
        ]).concat([
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // prevents moment from loading all locales
        ]),
        resolve: utils.resolve,
        module: utils.module,
        devServer: {
            contentBase: '.',
            port: port,
            historyApiFallback: {
                rewrites: [
                    {from: /(?!index)\.html/, to: '/index.html'}
                ]
            },
            hot: true,
            inline: true,
            stats: {
                cached: false,
                colors: true,
                chunks: true,
                modules: true,
                timings: true,
                exclude: excludeFromStats
            }
        }
    };

})();