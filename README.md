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

### 推送代码
```javascript
// 使用bash，其中source .bashrc执行一次即可，第二次直接push
source .bashrc
push '修改信息'
// 或 使用bash
msg=修改信息 npm run push
```

### pacakge.json解析
已注释掉的代表目前没有使用
```javascript
  "scripts": {
    "start": "启动项目，运行dev",
    "dev": "启动项目",
    "build": "构建项目，生成dist目录，代码为生产环境代码",
    "buildLib": "生成lib目录，代码为babel编译后的代码,  --copy-files表示所有文件都编译，不加表示只编译js",
    "lint": "检查js代码及样式代码",
    "lint:js": "检查js代码，包括.js及.jsx结尾代码",
    "lint:style": "检查样式代码，包括css及less",
    "push": "向远程仓库推送代码，例：msg=修改信息 npm run push, 提示：使用bash才可运行成功"
  },
  "sideEffects": "false，告诉 Webpack 没有文件有副作用，所有文件都可以 tree-shaking,会识别全局导入css为无用代码，造成全局导入css被删除，例：import './MyStylesheet.css';，可在css相关loader重新设为true",
  "peerDependency": "解决node_module目录下嵌套多层的问题，例a、b模块同时依赖c模块，a、b模块里把对c的依赖写在peerDependency里边，安装时c模块会与a、b模块同级, 用dependencies会生成多层node_module",
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
  "eslint": "js代码检查工具",
  // "eslint-loader": "在项目构建时进行js代码检查",
  "eslint-import-resolver-webpack": "解决webpack为路径取别名后eslint报错问题",
  // "stylelint-config-recommended": "开启了所有可能有错的样式的验证规则",
  "stylelint-config-standard": "开启了60多个风格规则并设置了实用的默认配置",
  "cross-env": "用于设置环境变量development或production",
  "optimize-css-assets-webpack-plugin": "css代码压缩插件",
  "babel-loader": "wepack的loader，编译文件js文件使用",
  "@babel/cli": "babel命令行工具，执行babel src -d lib，可将编译的源码存入lib目录，非必须",
  "@babel/core": "babel核心包，编译的transform方法在这个包里",
  "@babel/preset-env": "babel预设，让高级js代码转换到不同的目标环境中，集成多个pulgin",
  "@babel/preset-react":  "babel预设，让babel编译react代码",
  "@babel/plugin-transform-runtime": "辅助插件，它会自动动态require @babel/runtime中的内容",
  "happypack": "开启多个线程，让多个loader并行执行", 
  "progress-bar-webpack-plugin": "webpack插件，让控制台显示打包进度",
   "husky": "注册 git hook, 安装后在script里边写precommit命令，在git commit时会先执行这个命令，可以用来做提交前代码检查",
   "lint-staged": "取得所有被提交的文件依次执行写好的任务",
   // "speed-measure-webpack-plugin": "让控制台显示weback各个plugin和loader构建的时间，非必须，用于监控构建时间",
   "hard-source-webpack-plugin": "为模块提供中间缓存，第二次构建时速度可提升80%",
   "cache-loader": "缓存loder编译后的文件，放在所有loader之前，表示最后使用",
   "prettier": "代码风格校验，与eslint-plugin-prettier、eslint-config-prettier配合使用，与eslint的区别是，eslint注重代码质量，而prettier只校验代码风格",
   "eslint-plugin-prettier": "让eslint报告prettier的错误",
   "eslint-config-prettier": "禁用掉eslint的代码风格校验，默认用prettier的风格校验",
  }
  "dependencies": {
    "@babel/runtime": "提取编译生成的公用方法到其他文件，再引入这些方法，避免生成大量重复的代码",
    "@babel/polyfill": "让目标浏览器支持所有新特性，不管它是全局的，还是原型的，通过它，不同浏览器在特性支持上就站到同一起跑线",
    "core-js": "core-js就是@babel/polyfill的核心依赖,它尽可能的进行模块化，让你能选择你需要的功能,它可以不污染全局空间",
    "react": "react的核心代码",
    "react-dom": "react-dom是React剥离出的涉及DOM操作的部分",
  },
  //安装husky后直接配置，读取lint-staged任务
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  //git commit前执行的的任务列表
  "lint-staged": {
    "**/*.{js,jsx}": "npm run lint:js",
    "**/*.{css,less}": "npm run lint:style"
  }
  ```
