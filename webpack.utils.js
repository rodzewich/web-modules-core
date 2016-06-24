(function() {

    var path = require('path');
    var resolveFrom = require('resolve-from');

    /**
     * Resolves the true path to package, new NPM versions have flat module structure unlike old ones where packages are
     * nested which causes issues with finding plugins
     * @param name
     * @return {*}
     */
    function resolvePackage(name) {
        return resolveFrom(require.resolve('ringcentral'), name) ||
               resolveFrom(process.cwd(), name);
    }

    module.exports = {
        resolve: {
            extensions: ['', '.json', '.js', '.css', '.less', '.scss', '.sass'],
            alias: {
                'node-fetch': resolvePackage('whatwg-fetch'),
                'pubnub': resolvePackage('pubnub/modern/pubnub')
            }
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: require.resolve('babel-loader') + '?cacheDirectory',
                    include: [path.join(process.cwd(), 'src', 'app'), __dirname],
                    exclude: [path.join(__dirname, 'node_modules')]
                },
                {test: /\.json$/, loader: require.resolve('json-loader')},
                {test: /\.css$/, loader: require.resolve('style-loader') + '!' + require.resolve('css-loader')},
                {test: /\.scss$/, loader: require.resolve('style-loader') + '!' + require.resolve('css-loader') + '!' + require.resolve('sass-loader') + '?relative_assets=true'},
                {test: /\.(?:png|jpg|jpeg|gif)/, loader: require.resolve('url-loader') + '?limit=10000'}, //TODO Handle woff?foo
                {test: /\.(?:woff|woff2|otf|svg|ttf|eot)/, loader: require.resolve('file-loader')}
            ]
        }
    };

})();
