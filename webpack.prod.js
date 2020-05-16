const path = require('path');
const merge = require('webpack-merge');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackCommon = require('./webpack.common.js');

module.exports = merge(webpackCommon, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  optimization: { minimizer: [new OptimizeCSSAssetsPlugin(), new TerserJSPlugin()] },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: 'Kapsevich Ilya | Front End',
      template: path.resolve(__dirname, 'src/views/index.html'),
      inject: 'body',
      filename: 'index.[chunkhash:8].html',
      minify: false,
      // favicon: './src/assets/favicon/fav16.png',
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:8].css' }),
  ],
});
