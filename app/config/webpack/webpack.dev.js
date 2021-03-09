/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const paths = require('../paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    publicPath: '/',
    open: true,
    compress: true,
    host: process.env.HOST,
    port: process.env.PORT || 3000,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ],
});
