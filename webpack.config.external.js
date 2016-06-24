(function() {

    if (typeof global.Promise === 'undefined') {
        global.Promise = require('bluebird');
    }

    var webpack = require('webpack'),
        WebpackDevServer = require("webpack-dev-server"),
        path = require('path'),
        glob = require('glob'),
        colors = require('colors'),
        argv = require('optimist').argv,
        Table = require('easy-table'),
        utils = require('./webpack.utils'),

        globPattern = argv.pattern || '**',
        debugTable = argv.debugTable,
        productionMode = argv.production,

        allEntries = globModules(),
        allEntriesAbs = allEntries.map(function(file) {
            return nixSlashes(path.normalize(path.join(process.cwd(), file)));
        }),
        allPackageNames = allEntries.map(function(entry) {
            return entry.replace('./src/app/', '').replace(/\/index.*?.js/, '');
        }).sort(),

        entries = allEntries,
        excludeFromStats = [
            /node_modules[\\\/]react(-router)?[\\\/]/,
            /node_modules[\\\/]items-store[\\\/]/
        ];

    function makeRelative(file) {
        return file.replace('./src/app/', './');
    }

    function globModules() {
        return glob.sync('./src/app/' + globPattern + '/index*.js', {cwd: process.cwd()});
    }

    function nixSlashes(path) {
        return path.split('\\').join('/');
    }

    /**
     * In order to be a part of the package path must match at least one of the package names
     * @param path
     * @return {string|null}
     */
    function getPackageName(path) {
        return allPackageNames.reduce(function(res, name) {
            //if (res) return res;
            if (path.indexOf(name) > 1) return name;
            return res;
        }, null);
    }

    function isSameContext(path, context) {
        return getPackageName(path) == getPackageName(context);
    }

    function isEndpoint(file) {
        return /src\/app\/[a-z0-9]+\/[a-z0-9]+\/index/i.test(file);
    }

    function createConfig(currentEntries, options) {

        currentEntries = currentEntries || entries;

        var debugTablePlugin = new DebugTablePlugin(),
            plugins = [];

        options = options || {};
        options.path = options.path || 'build/app/';
        options.publicPath = options.publicPath || '/src/app/';
        options.publicPathProduction = options.publicPathProduction || 'app/';

        //@see https://github.com/webpack/webpack/issues/198
        plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); // prevents moment from loading all locales

        plugins.push(new webpack.WatchIgnorePlugin([
            path.resolve(process.cwd(), './node_modules/')
        ]));

        if (debugTable) plugins.push(debugTablePlugin);

        if (productionMode) {
            plugins.push(new webpack.DefinePlugin({
                'process.env': {NODE_ENV: '"production"'}
            }));
        }

        return {
            context: process.cwd(),
            debug: true,
            devtool: '#source-map',
            entry: currentEntries.reduce(function(entry, file) {
                entry[makeRelative(file)] = [file];
                return entry;
            }, {}),
            output: {
                libraryTarget: 'amd',
                path: options.path,
                publicPath: productionMode ? options.publicPathProduction : options.publicPath,
                sourcePrefix: '',
                filename: "[name]",
                chunkFilename: "[id].chunk.js"
            },
            externals: [
                function(context, request, callback) {

                    context = nixSlashes(context);

                    var reqParts = request.split('!'),
                        reqName = reqParts[reqParts.length - 1];

                    var absPath = nixSlashes(path.normalize(path.join(context, reqName))),
                        isNPM = request.indexOf('node_modules') != -1 || context.indexOf('node_modules') != -1,
                        webpackContext = (context == nixSlashes(process.cwd())),
                        contextPackageName = getPackageName(context),
                        requestPackageName = getPackageName(absPath),
                        samePackage = contextPackageName == requestPackageName,
                        externalize = isEndpoint(absPath) && !webpackContext && !isNPM,
                        externalWarning = (!externalize && !samePackage && !webpackContext && !isNPM && requestPackageName);

                    debugTablePlugin.push({
                        externalize: externalize,
                        file: absPath,
                        context: context,
                        request: reqName,
                        contextPackageName: contextPackageName,
                        requestPackageName: requestPackageName,
                        samePackage: samePackage,
                        webpackContext: webpackContext,
                        externalWarning: externalWarning
                    });

                    if (externalWarning) {
                        return callback(new Error('External module\'s part "' + reqName + '" has been used directly in context "' + context + '"\n' +
                                                  'Request Package Name: ' + requestPackageName + '\n' +
                                                  'Context Package Name: ' + contextPackageName + '\n' +
                                                  'Absolute Path: ' + absPath));
                        //console.error(colors.red(message));
                    }

                    if (externalize) {
                        return callback(null, {amd: '../../' + requestPackageName + '/' + absPath.split('/').pop()}); // webpack fails to collapse all ../../../foo/index to one
                        //return callback(null, true);
                    }

                    callback();

                }
            ],
            plugins: plugins,
            resolve: utils.resolve,
            module: utils.module,
            devServer: {
                port: 3000,
                noInfo: true,
                quiet: false,
                lazy: false,
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: true
                },
                contentBase: '.',
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

    }

    /**
     * @see https://github.com/webpack/docs/wiki/plugins
     * @constructor
     */
    function DebugTablePlugin() {
        this.resolvedFiles = [];
    }

    DebugTablePlugin.prototype.push = function(file) {
        this.resolvedFiles.push(file);
    };

    DebugTablePlugin.prototype.apply = function(compiler) {

        var self = this;

        compiler.plugin("compile", function(params) {
            self.resolvedFiles = [];
            console.log("Compiling...");
        });

        compiler.plugin("compilation", function(compilation) {
            compilation.plugin("optimize", function() {

                function maxLength(str, size) {
                    if (str.length < size) return str;
                    return str.substr(0, (size / 2) - 2) + ' ... ' + str.substr(str.length - (size / 2) + 3);
                }

                var t = new Table();

                self.resolvedFiles.forEach(function(file) {
                    var filePath = maxLength(file.file, 100);
                    t.cell('Ext', file.externalize ? colors.magenta('EXT') : 'REQ');
                    t.cell('File', file.externalize ? colors.magenta(filePath) : colors.cyan(filePath));
                    t.cell('Context', maxLength(file.context, 50));
                    t.cell('Request', maxLength(file.request, 50));
                    t.cell('Context Package', colors.cyan(file.contextPackageName));
                    t.cell('Same Package', file.samePackage);
                    t.cell('Webpack Context', file.webpackContext);
                    t.newRow()
                });

                console.log(t.toString());

                console.log("The compilation is now optimizing your stuff");

            });
        });

        compiler.plugin('done', function() {
            console.log('Done');
        });

    };

    module.exports = createConfig(entries);
    module.exports.createConfig = createConfig;
    module.exports.globModules = globModules;
    module.exports.getPackageName = getPackageName;
    module.exports.makeRelative = makeRelative;
    module.exports.createServer = function(config) {

        config = config || module.exports;

        var options = config.devServer;
        options.publicPath = config.output.publicPath;
        options.host = 'localhost';

        var server = new WebpackDevServer(webpack(config), options);

        server.listen(options.port, options.host, function(err) {
            if (options.inline)
                console.log("http://" + options.host + ":" + options.port + "/");
            else
                console.log("http://" + options.host + ":" + options.port + "/webpack-dev-server/");
            console.log("webpack result is served from " + options.publicPath);
            if (typeof options.contentBase === "object")
                console.log("requests are proxied to " + options.contentBase.target);
            else
                console.log("content is served from " + options.contentBase);
        });

    };

})();
