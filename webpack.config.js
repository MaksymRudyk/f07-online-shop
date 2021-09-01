const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
    ],
    module: {
        rules: [{
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