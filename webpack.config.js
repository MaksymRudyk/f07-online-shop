const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: "bundle.[chunkhash].js",
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000,
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ''
                    }
                },
                {
                    loader: "css-loader",
                    options: {url: false, sourceMap: true}
                }
                , {
                    loader: "sass-loader",
                    options: {sourceMap: true}
                }
            ]
        },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: './',
                        useRelativePath: true,
                    }
                },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 80
                            }
                        }
                    }
                ]
            }
        ]
    }
}
