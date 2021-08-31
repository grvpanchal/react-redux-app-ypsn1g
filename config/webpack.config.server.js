// At the top of your webpack config, insert this
const fs = require('fs');
const gracefulFs = require('graceful-fs');

gracefulFs.gracefulify(fs);

const webpack = require('webpack');
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

 process.env.NODE_ENV = 'development';

const getClientEnvironment = require('./env');

const env = getClientEnvironment();

function config() {
    const webpackConfig = {
        target: 'node',
        stats: 'errors-only',
        node: {
            __dirname: false,
            __filename: false,
        },
        externals: ['react', 'react-dom', '@mfe/hello', nodeExternals()],
        entry: {
            server: [
                path.resolve(__dirname, '..', 'server.system.js'),
            ],
        },
        output: {
            libraryTarget: 'system',
            path: path.resolve(__dirname, '..', 'build/server'),
            filename: 'server.system.js',
        },
        resolve: {
            alias: {
            },
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src'),
            ],
            extensions: [
                '*',
                '.js',
                '.json',
                '.jsx',
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        'isomorphic-style-loader',
                        {
                            loader: 'css-loader?importLoaders=2&sourceMap',
                            options: {
                                importLoaders: 1,
                            },
                        },
                    ],
                },
                { test: /\.(jpg|png|gif)$/, use: 'file-loader?name=public/img/[hash].[ext]' },
            ],
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: 'require("source-map-support").install();',
                raw: true,
                entryOnly: false,
            }),
            new webpack.DefinePlugin(env.stringified),
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDOM: 'react-dom',
            }),
            // new CopyWebpackPlugin([
            //     { from: 'node_modules', to: 'node_modules' },
            // ]),
            // new webpack.optimize.LimitChunkCountPlugin({
            //     maxChunks: 1,
            // }),
        ],
        // devtool: 'source-map',
    };

    return webpackConfig;
}

module.exports = config;
