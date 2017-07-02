const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        app: [
            './app/main.js'
        ]
    },
    output: {
        path: resolve('../dist'),
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
                include: [resolve('app')]
            },
            {
                test: /\.css$/,
                loader: 'css-loader', //'style-loader!css-loader',
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
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: resolve(__dirname, 'app', 'fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
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
