### 安装与运行
```javascript
// 安装依赖
npm i
// 运行项目
npm start 或 npm run dev
```

### 构建
```javascript
npm run build
```

### pacakge.json解析
```javascript
  "scripts": {
    "start": "启动项目，运行dev",
    "dev": "启动项目",
    "build": "构建项目，生成dist目录，代码为生产环境代码",
    "buildLib": "生成lib目录，代码为babel编译后的代码"
  },
  "sideEffects": "false，告诉 Webpack 没有文件有副作用，所有文件都可以 tree-shaking,会识别全局导入css为无用代码，造成全局导入css被删除，例：import './MyStylesheet.css';，可在css相关loader重新设为true",
  "devDependencies": {
  "autoprefixer": "postcss插件，对不同浏览器环境加前缀",
  "file-loader": "用于处理图片loader"，
  "url-loader": "用于处理图片，与file-loader类似，不同的是url-loader可以设置limit，表示小于限制大小后图片转化为base64，必须先安装file-loader",
  "css-loader": "将css转换为webpack可识别的js代码",
  "extract-text-webpack-plugin": "单独打包css，将css从js中提取出来",
  "html-webpack-plugin": "为js文件提供html模板",
  "less": "css预处理器",
  "less-loader": "将less文件编译为css代码",
  "postcss-loader": "css插件工具，例如针对不同浏览器环境加前缀",
  "stylelint": "css代码检查工具",
  "webpack": "代码打包工具",
  "webpack-cli": "webpack命令行工具",
  "webpack-dev-server": "开启一个本地服务，使用便于缓存代码运行，并非真正打包，需与html-webpack-plugin结合使用",
  "stylelint-config-recommended": "开启了所有可能有错的样式的验证规则",
  "cross-env": "用于设置环境变量development或production",
  "optimize-css-assets-webpack-plugin": "css代码压缩插件",
  "babel-loader": "wepack的loader，编译文件js文件使用",
  "@babel/cli": "babel命令行工具，执行babel src -d lib，可将编译的源码存入lib目录，非必须",
  "@babel/core": "babel核心包，编译的transform方法在这个包里",
  "@babel/polyfill": "让目标浏览器支持所有新特性，不管它是全局的，还是原型的，通过它，不同浏览器在特性支持上就站到同一起跑线",
  "@babel/preset-env": "babel预设，让高级js代码转换到不同的目标环境中，集成多个pulgin",
  "@babel/preset-react":  "babel预设，让babel编译react代码",
  "@babel/runtime": "提取编译生成的公用方法到其他文件，再引入这些方法，避免生成大量重复的代码",
  "@babel/plugin-transform-runtime": "辅助插件，它会自动动态require @babel/runtime中的内容",
  "happypack": "开启多个线程，让多个loader并行执行", 
  }
  ```
