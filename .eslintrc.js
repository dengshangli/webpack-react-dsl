
const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // 支持jsx及js拓展文件
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // "no-console": "off",
    // 忽略语句分号
    'semi': 0,
  },
  
  settings: {
    // 解决webpack为路径取别名后eslint报错问题
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js')
      }
    }
  }
};
