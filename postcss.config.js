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
    // stylelint({
    //   config: {
    //     rules: {
    //       // 当我们的代码中出现了“！important”时，控制台就会给出警告
    //       'declaration-no-important': true,
    //     },
    //   },
    // }),
  ],
};
