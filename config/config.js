const path = require('path');
const argv = require('yargs').argv;


const { projectType } = argv;

const config = {
  entry:  require('./getEntries').entry,
  dev: {
    port: 3004,
    hostName: 'localhost',
    autoOpenBrowser: true,
    publicPath: '/cashloanmarket-web-site',
    proxyTable: {
      context: [
        // '/cashloanmarket-web-site/cashloanmarket/**',
        // '!*.html'
        '/cashloanmarket-web-site/cashloanmarket/getBanner.htm',
        '/cashloanmarket-web-site/cashloanmarket/productType.htm',
        '/cashloanmarket-web-site/cashloanmarket/productList.htm'
      ],
      options: {
        // target: 'http://192.168.25.151:8080',
        target: 'http://test.xunleiyidai.com',
        changeOrigin: true
      }
    }
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    publicPath: '/cashloanmarket-web-site',
  }
}

module.exports = config;