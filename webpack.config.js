let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry : ["./scripts/app.js"],
    output: {
        filename: "./scripts/bundle.js"
    },

    module: {
        loaders: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                loader : "babel-loader",
            },
            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "file-loader"},
            {test: /\.eot$/, loader: "file-loader"},
            {test: /\.svg$/, loader: "file-loader"}
        ]
    },

    resolve: {
        extensions: ["", ".js"],
        alias: {
            // Bind version of jquery
            jquery: "jquery",
            lodash: "lodash"
        }
    },
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host  : 'localhost',
            port  : 3030,
            server: {baseDir: ['']}
        }),
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery",
            _ : "lodash"
        })
    ]
};
