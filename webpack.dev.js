const merge = require('webpack-merge');
const { EnvironmentPlugin } = require('webpack');

const webpackCommon = require('./webpack.common.js');

const { PATHS } = webpackCommon.externals;
const strategy = {
  'module.rules.use': 'prepend',
};

module.exports = merge.smartStrategy(strategy)(webpackCommon, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: PATHS.dist,
    port: 8081,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    rules: [{ test: /\.((c|sa|sc)ss)$/i, use: [{ loader: 'style-loader' }] }],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
});
