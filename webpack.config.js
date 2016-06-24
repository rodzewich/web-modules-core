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
        resolve: {
            extensions: ['', '.json', '.js', '.css', '.less']
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel?cacheDirectory', exclude: /node_modules/},
                {test: /\.json$/, loader: 'json'},
                {test: /\.css$/, loader: 'style!css'},
                {test: /\.(?:scss|sass)$/, loader: 'style!css!sass?relative_assets=true'},
                {test: /\.(?:png|jpg|jpeg|gif)/, loader: 'url?limit=10000'}, //TODO Handle woff?foo
                {test: /\.(?:woff|woff2|otf|svg|ttf|eot)/, loader: 'file'}
            ]
        },
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