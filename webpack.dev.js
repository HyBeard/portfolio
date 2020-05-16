const path = require('path');
const merge = require('webpack-merge');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackCommon = require('./webpack.common.js');

module.exports = merge(webpackCommon, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8081,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
    new HtmlWebPackPlugin({
      title: 'Kapsevich Ilya | Front End',
      template: path.resolve(__dirname, 'src/views/index.html'),
      inject: 'body',
      filename: 'index.html',
      minify: false,
      // favicon: './src/assets/favicon/fav16.png',
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
});
