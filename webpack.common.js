const path = require('path');

const miniSvgDataUri = require('mini-svg-data-uri');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: path.join(__dirname, 'src/assets'),
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    main: PATHS.src,
  },
  output: {
    path: PATHS.dist,
  },
  target: 'web',
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 16 * 1024,
              outputPath: 'assets',
              name: '[folder]/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4 * 1024,
              generator: (content) => miniSvgDataUri(content.toString()),
              outputPath: 'assets',
              name: '[folder]/[name].[ext]',
            },
          },
          { loader: 'svgo-loader' },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
              name: '[folder]/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
