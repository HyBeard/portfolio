const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniSvgDataUri = require('mini-svg-data-uri');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const skillsData = require('./src/data/skills.json');
const projectsData = require('./src/data/projects.json');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: path.join(__dirname, 'src/assets'),
};

module.exports = {
  externals: {
    PATHS,
  },
  entry: {
    main: PATHS.src,
  },
  output: {
    path: PATHS.dist,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(hbs|handlebars)$/,
        use: [
          {
            loader: 'handlebars-loader',
            query: {
              partialDirs: `${PATHS.src}/views/partials`,
              helperDirs: `${PATHS.src}/views/helpers`,
              inlineRequires: /\/assets\/images\//gi,
            },
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
              name: '[folder]/[name].[hash:4].[ext]',
              esModule: false, // very important for HBS
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
              name: '[folder]/[name].[hash:4].[ext]',
            },
          },
          { loader: 'svgo-loader' },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[folder]/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Kapsevich Ilya | Front End',
      template: 'src/views/index.hbs',
      inject: 'body',
      templateParameters: {
        skillsData,
        projectsData,
      },
    }),
  ],
};
