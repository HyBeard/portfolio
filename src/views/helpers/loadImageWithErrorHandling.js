const errorIcon = require('../../assets/icons/error.png');

module.exports = (image, options) => {
  try {
    // eslint-disable-next-line
    const src = require(`../../assets/images/${image}`);

    return options.fn({ src, style: '' });
  } catch (error) {
    return options.fn({
      src: errorIcon,
      style: 'padding: 3rem',
    });
  }
};
