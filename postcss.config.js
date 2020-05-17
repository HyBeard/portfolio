const postcssImport = require('postcss-import');
const postcssPurgeCss = require('@fullhuman/postcss-purgecss');
const postcssNormalize = require('postcss-normalize');
const postcssPxToRem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const postcssSortMediaQueries = require('postcss-sort-media-queries');

module.exports = ({ webpack }) => {
  const isProd = webpack.mode === 'production';

  return {
    plugins: [
      postcssImport(postcssNormalize().postcssImport({ path: ['./src/styles'] })),
      postcssPurgeCss({
        content: ['./src/**/*.html', './src/**/*.hbs'],
        whitelistPatterns: [/visible/, /active/, /hidden/, /transparent/],
      }),
      isProd ? autoprefixer() : false,
      isProd ? postcssSortMediaQueries() : false,
      postcssPxToRem({ propList: ['*', '!*border*'] }),
    ],
  };
};
