process.env.NODE_ENV = 'development';

const opn = require('opn');

const path = require('path');

const express = require('express');

const webpack = require('webpack');

// 将http请求代理到其他服务器
const proxyMiddleware = require('http-proxy-middleware');

const config = require('../config/config');

// 根据 Node 环境来引入相应的 webpack 配置
const webpackConfig = require('./webpack.dev.config');

const proxyTable = config.dev.proxyTable;

// dev-server 监听的端口，默认为baseConfig.dev.port设置的端口，即8080
const port = config.port;

// 创建1个 express 实例
const app = express();
// 　m.engine('html',require('ejs').__express);
// //   m.set('views', path.join(__dirname, '../src/html/'));
//
// 　　m.set('view engine','html');
// m.use(express.static(path.join(__dirname, '../src')));
// m.use('/', express.static('./dist'));


// 根据webpack配置文件创建Compiler对象
console.log('----------------最终结果---------------------');
console.log(webpackConfig);
const compiler = webpack(webpackConfig);

// m.get('/cashloanmarket-web-site/m/*', function (req, res) {
//   console.log('GET ', 'http://localhost:3004/cashloanmarket-web-site/app/', req.originalUrl);
//   console.log(compiler.outputPath + '/m.entry.html');
//   const htmlStr = compiler.outputFileSystem.readFileSync(compiler.outputPath + '/m.entry.html') + "";
//   res.send(htmlStr);
// })

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  hot: true,
  publicPath: '/cashloanmarket-web-site',
  quiet: false
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// 反向代理
if (proxyTable.context) {
  app.use(proxyMiddleware(proxyTable.context, proxyTable.options));
}

var rewrites = {
  rewrites: [{
    from: '/cashloanmarket-web-site/m/cashloanmarket', // 正则或者字符串
    to: '/cashloanmarket-web-site/m/cashloanmarket/index.htm', // 字符串或者函数
  }],
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}

// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')(rewrites))

app.use(devMiddleware);

app.use(hotMiddleware);

const uri = `http://${config.dev.hostName}:${config.dev.port}`;
console.log(uri);

// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri} \n`);
});

// 启动express服务器并监听相应的端口
module.exports = app.listen(config.dev.port, config.dev.hostName, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  // 打开浏览器
  opn(uri, { app: 'chrome' });
});