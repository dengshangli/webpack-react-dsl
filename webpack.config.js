const path = require('path');
const os = require('os');
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
    // 开启js代码压缩，生产环境为true
    minimize: isProd ? true : false,
    // 压缩器
    minimizer: [
       // js代码压缩插件,tree-shaking必须使用
      new TerserPlugin({
        sourceMap: true,
      }),
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
  resolve: {
    alias: {
      // 为某个路径取别名
      assets: path.resolve(__dirname, 'src/assets/'),
    }
  },
  // 必须与HtmlWebpackPlugin配合使用，否则无法使用缓存的文件，只能用dist目录下文件
  devServer: {
    //  __dirname表示当前文件绝对目录，join()用于连接目录
    contentBase: path.join(__dirname, 'dist'),
    // 配置是否启用 gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    // 启用 webpack 的模块热替换特性
    hot: true,
    // 自动打开浏览器
    open: true,
    // 域名配置，用本机ip
    host: getNetworkIp(),
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
      test: /\.(js|jsx)$/,
      loader: 'happypack/loader?id=js',
      exclude: /(node_modules|bower_components)/,
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
              // 表示小于限制大小后图片转化为base64,单位Byte,1024Byte(字节)=1KB
              limit: 10240,
              name: '[name].[ext]',
              outputPath: './assets/',
          },
        }
      ],
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
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: './public/index.html'
    }),
  ]
}

function getNetworkIp() {
	let needHost = ''; // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces();
		for (let dev in network) {
			let iface = network[dev];
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address;
				}
			}
		}
	} catch (e) {
		needHost = 'localhost';
	}
	return needHost;
}
