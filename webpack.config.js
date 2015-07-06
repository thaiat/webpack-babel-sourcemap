'use strict';
module.exports = {
    entry: './src/main.js',
    output: {
        filename: './src/bundle.js'
    },
    devtool: 'source-map',
    stats: {
        colors: true,
        reasons: true,
        hash: false,
        modulesSort: 'name'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            cacheable: true,
            loader: 'babel-loader',
            query: {
                stage: 0,
                //optional: ['runtime', 'es7.asyncFunctions'],
                retainLines: true,
                cacheDirectory: true
            }
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'transform/cacheable?brfs',
            cacheable: true
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'transform/cacheable?envify',
            cacheable: true
        }]
    }
};
