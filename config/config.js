const path = require('path');
const argv = require('yargs').argv;


const { projectType } = argv;

const config = {
  entry:  require('./getEntries').entry,
  publicPath: '',
  dev: {
    port: 3004,
    hostName: 'localhost',
    autoOpenBrowser: true,
    proxyTable: {
      context: [
        // '/cashloanmarket/**',
        // '!*.html'
        '/cashloanmarket/getBanner.htm',
        '/cashloanmarket/productType.htm',
        '/cashloanmarket/productList.htm'
      ],
      options: {
        // target: 'http://192.168.25.151:8080',
        target: 'http://test.xunleiyidai.com/cashloanmarket-web-site/',
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