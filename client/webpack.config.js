var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var glob = require("glob");

module.exports = {
    entry: {
        "app": glob.sync("./site/**/**.js")
    },
    output:{
        publicPath: "/client",
        path: path.resolve("../build/client"),
        filename: "js/app.bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('css/app.css', {
            allChunks: true,
            disable: process.env.NODE_ENV !== "production"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "es2015", "react", "stage-3"]
                }
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract('css-loader!sass-loader')             
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')                
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    stats: {
        colors: true
    }
};
