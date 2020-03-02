const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

module.exports = {
  plugins: [
    autoprefixer({
      grid: true,
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'android 4.2',
        'ie 8',
      ],
    }),
  ],
};
