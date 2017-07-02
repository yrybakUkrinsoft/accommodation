const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        app: [
            './dev/dev-client.js',
            './app/main.js'
        ]
    },
    output: {
        path: resolve(__dirname, 'app'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            resolve('app'),
            resolve('node_modules')
        ],
        alias: {
            'app': resolve('app'),
        }
    },
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('app'), resolve('test')]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader', //'style-loader!css-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: resolve(__dirname, 'app', 'img/[name].[hash:7].[ext]')
                }
            },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url-loader',
            //     query: {
            //         limit: 10000
            //     }
            // },
            { test: /\.woff$/,   loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.ttf$/,    loader: 'url-loader?mimetype=application/font-ttf' },
            { test: /\.eot$/,    loader: 'url-loader?mimetype=application/font-eot' },
            { test: /\.svg$/,    loader: 'url-loader?mimetype=iamge/svg' },
            { test: /\.png$/,    loader: 'url-loader?mimetype=image/png' },
            { test: /\.jpg$/,    loader: 'url-loader?mimetype=image/jpg' },
            { test: /\.gif$/,    loader: 'url-loader?mimetype=image/gif' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css'
        }),
        new OptimizeCSSPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'app/index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
}

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
