process.env.NODE_ENV = 'development';

const opn = require('opn');

const path = require('path');

const express = require('express');

const webpack = require('webpack');

// 将http请求代理到其他服务器
const proxyMiddleware = require('http-proxy-middleware');

const config = require('../config/config');

// 根据 Node 环境来引入相应的 webpack 配置
const pcWebpackConfig = require('./pc/webpack.dev.config');
const appWebpackConfig = require('./app/webpack.dev.config');

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
const pcCompiler = webpack(pcWebpackConfig);
const appCompiler = webpack(appWebpackConfig);

// m.get('/cashloanmarket-web-site/m/*', function (req, res) {
//   console.log('GET ', 'http://localhost:3004/cashloanmarket-web-site/app/', req.originalUrl);
//   console.log(compiler.outputPath + '/m.entry.html');
//   const htmlStr = compiler.outputFileSystem.readFileSync(compiler.outputPath + '/m.entry.html') + "";
//   res.send(htmlStr);
// })

const pcDevMiddleware = require('webpack-dev-middleware')(pcCompiler, {
  hot: true,
  publicPath: process.env.NODE_ENV === 'production' ? `${config.build.publicPath}` : `${config.dev.publicPath}`,
  quiet: false
});

const pcHotMiddleware = require('webpack-hot-middleware')(pcCompiler, {
  log: () => {}
});

pcCompiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

const appDevMiddleware = require('webpack-dev-middleware')(appCompiler, {
  hot: true,
  publicPath: process.env.NODE_ENV === 'production' ? `${config.build.publicPath}` : `${config.dev.publicPath}`,
  quiet: false
});

const appHotMiddleware = require('webpack-hot-middleware')(appCompiler, {
  log: () => {}
});

appCompiler.plugin('compilation', (compilation) => {
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
    from: `${process.env.NODE_ENV === 'production' ? config.build.publicPath : config.dev.publicPath}/m/cashloanmarket`, // 正则或者字符串
    to: `${process.env.NODE_ENV === 'production' ? config.build.publicPath : config.dev.publicPath}/m/cashloanmarket/index.htm`, // 字符串或者函数
  }],
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}

// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')(rewrites))

app.use(pcDevMiddleware);

app.use(pcHotMiddleware);

app.use(appDevMiddleware);

app.use(appHotMiddleware);

const uri = `http://${config.dev.hostName}:${config.dev.port}`;
console.log(uri);

// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
pcDevMiddleware.waitUntilValid(() => {
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