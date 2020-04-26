const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// webpack v4.0 使用mini-css-extract-plugin替代extract-text-webpack-plugin
// 使用mini-css-extract-plugin的loader，就不能使用style-loader，否则报错
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const chunks = ['polyfill', 'app'];
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: "index.html",
    inject: true,
    chunks: chunks,
    chunksSortMode: function (a, b) {
        let aIndex = chunks.indexOf(a);
        let bIndex = chunks.indexOf(b);
        aIndex = aIndex < 0 ? chunks.length + 1 : aIndex;
        bIndex = bIndex < 0 ? chunks.length + 1 : bIndex;
        return aIndex - bIndex;
    }
});

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        app: path.resolve(__dirname, './src/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.[name].[hash].js"
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        inline: true,
        open: true,
        contentBase: './dist'
    },
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'latest', 'stage-1']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|jpg|jpeg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        htmlWebpackPluginConfig,
        new miniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ]
};
