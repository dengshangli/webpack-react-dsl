const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HappyPack = require('happypack');
const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename:  isProd ? 'bundle@[chunkhash].js' : 'bundle.js',
  },
  mode: NODE_ENV,
  devtool: isProd ? 'none' : 'source-map',
  // 让控制台不显示全部构建信息，有错误时才显示
  stats: 'errors-only',
  optimization: {
    // 提取公共文件
    splitChunks: {
      chunks: 'all', // 默认为async, all代表同步异步导入时都可以提取
    },
    // 开启js代码压缩，生产环境自动为true
    minimize: true,
    // 压缩器
    minimizer: [
       // js代码压缩插件,tree-shaking必须使用
      new TerserPlugin(),
       // css代码压缩插件
      new OptimizeCSSAssetsPlugin({
      // 压缩处理器, 默认为 cssnano，webpack内置，不用安装
      // cssnano 将你的 CSS 文件做 多方面的的优化，以确保最终生成的文件 对生产环境来说体积是最小的
      cssProcessor: require('cssnano'),
      // 压缩处理器的配置
      cssProcessorOptions: { discardComments: { removeAll: true } },
      // 是否展示 log
      canPrint: true,
    }),
  ],
    //Webpack将识别出它认为没有被使用的代码，并在最初的打包步骤中给它做标记,tree-shaking有用
    usedExports: true,
  },
  // 必须与HtmlWebpackPlugin配合使用，否则无法使用缓存的文件，只能用dist目录下文件
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    hot: true,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
               //开启css模块化
                modules: { localIdentName: '[path][name]__[local]--[hash:base64:5]' },
                sourceMap: true,
            },
         }, 
          'postcss-loader'
        ],
      }),
       // 将css代码识别为有副作用，避免tree-sahking执行全局import 'styles.css'失效
      sideEffects: true,
      exclude: /node_modules/,
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              //开启css模块化
              modules: { localIdentName: '[path][name]__[local]--[hash:base64:5]' },
              sourceMap: true,
            },
         }, 
          'postcss-loader', 
          {
            loader: 'less-loader',
            options: {
               sourceMap: true,
            },
         }, 
        ],
      }),
      // 将css代码识别为有副作用，避免tree-sahking执行全局import 'styles.css'失效
      sideEffects: true,
      exclude: /node_modules/,
    }, {
      test: /\.js$/,
      loader: 'happypack/loader?id=js',
      exclude: /(node_modules|bower_components)/,
    }],
  },
  plugins: [
    // 开启多个线程构建，提升构建速度
    new HappyPack({
      id: 'js',
      loaders: [
        // // 自定义loader,增加'use strict'
        // 'force-strict-loader',
        'babel-loader',
      ],
    }),
    // 提取css代码
    new ExtractTextPlugin(isProd ? 'bundle@[chunkhash].css' : 'bundle.css'),
    // 将js、css代码插入html模板文件中
    new HtmlWebpackPlugin(),
    // 热重载插件
    // new webpack.HotModuleReplacementPlugin(),
  ]
}
