/*
 * @Author: 邓尚理
 * @Date: 2020-03-30 14:40:37
 * @LastEditTime: 2020-08-14 17:34:46
 * @LastEditors: 邓尚理
 * @Description: 
 * @FilePath: \webpack-react-dsl\.eslintrc.js
 */

const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    "plugin:prettier/recommended",
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
