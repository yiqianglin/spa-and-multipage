if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const opn = require('opn');

const path = require('path');

const express = require('express');

const webpack = require('webpack');

//将http请求代理到其他服务器
var proxyMiddleware = require('http-proxy-middleware');

const config = require('../config/config');

// 根据 Node 环境来引入相应的 webpack 配置
var webpackConfig = require('./webpack.dev.config');

const proxyTable = config.dev.proxyTable;

// dev-server 监听的端口，默认为baseConfig.dev.port设置的端口，即8080
var port = config.port;

// 创建1个 express 实例
var app = express()
// 　app.engine('html',require('ejs').__express);
// //   app.set('views', path.join(__dirname, '../src/html/'));
//
// 　　app.set('view engine','html');
　　app.use(express.static(path.join(__dirname, '../src')));  

//根据webpack配置文件创建Compiler对象
console.log('----------------最终结果---------------------');
console.log(webpackConfig);
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

//反向代理
if (proxyTable.context) {
  app.use(proxyMiddleware(proxyTable.context, proxyTable.options));
}


// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

var uri = `http://${config.dev.hostName}:${config.dev.port}`;
console.log(uri);

// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at ${uri} \n`)
})

// 启动express服务器并监听相应的端口
module.exports = app.listen(config.dev.port, config.dev.hostName, function (err) {
  if (err) {
    console.log(err)
    return
  }

 //打开浏览器
  opn(uri, { app: 'chrome' })
})