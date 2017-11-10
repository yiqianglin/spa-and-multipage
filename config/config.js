const path = require('path');
const argv = require('yargs').argv;


const { projectType } = argv;

const config = {
  entry:  require('./getEntries').entry,
  dev: {
    port: 3004,
    hostName: 'localhost',
    publicPath: '',
    autoOpenBrowser: true,
    proxyTable: {
      context: [
        // '/cashloanmarket/**',
        // '!*.html'
        '/cashloanmarket/getBanner.htm',
        '/cashloanmarket/productType.htm',
        '/cashloanmarket/productList.htm',
        '/stat/clickproduct.htm',
      ],
      options: {
        // target: 'http://192.168.25.151:8080',
        target: 'http://test.xunleiyidai.com/cashloanmarket-web-site/',
        changeOrigin: true,
        // ws: true,
        // pathRewrite: {
        //   '/cashloanmarket/getBanner.htm': '/cashloanmarket-web-site/cashloanmarket/getBanner.htm',
        //   '/cashloanmarket/productType.htm': '/cashloanmarket-web-site/cashloanmarket/productType.htm',
        //   '/cashloanmarket/productList.htm': '/cashloanmarket-web-site/cashloanmarket/productType.htm',
        //   '/stat/clickproduct.htm': '/cashloanmarket-web-site/stat/clickproduct.htm'
        // }
      }
    }
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    publicPath: '/cashloanmarket-web-site',
  }
}

module.exports = config;