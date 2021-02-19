const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const proxy = {
  '/test/*': {
    target: 'http://yapi.afpai.com/mock/768', // 源地址
    changeOrigin: true, // 改变源
    ws: true,
    pathRewrite: {
      '^/api': ''
    }
  },
  // 起一个本地服务且有study目录
  // '/study/*': {
  //   target: 'http://localhost:70',
  //   changeOrigin: true, // 改变源
  // }
  '/study/*': {
    // target相当于baseUrl，访问完整路径：/webpack-learn/test/study/mock/mytest3，所以站点根目录下.htaccess配置如下
    // RewriteRule ^webpack-learn/test/study/mock/mytest3$                  /webpack-learn/test/study/mock/mytest3.json
    target: 'http://localhost:70/webpack-learn/test',
    changeOrigin: true, // 改变源
  },
  '/omsdata/*': {
    target: 'http://yapi.sftcwl.com/mock/925',
    changeOrigin: true,
  },
};

module.exports = merge(common, {
  mode: 'development',
  output: {
    // S使用 webpack-dev-middleware   开发模式   server.js和node server.js
    publicPath: '/',
    // E使用 webpack-dev-middleware   开发模式   server.js和node server.js
  },
  devtool: 'inline-source-map',

  // 使用观察模式  webpack --watch  build完成后需要手动刷新
  // S使用 webpack-dev-server  开发模式（常用方式）  webpack-dev-server --open
  devServer: {
    contentBase: './src',
    // hot: true,//使用contenthash之后需要关闭热更新，否则编译报错
    proxy: proxy
  },
  // E使用 webpack-dev-server  开发模式（常用方式）  webpack-dev-server --open
  plugins: [
    new webpack.NamedModulesPlugin(),
  ]
})