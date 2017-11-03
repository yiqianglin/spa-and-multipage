const path = require('path');
const argv = require('yargs').argv;


const { projectType } = argv;
const activityEntry =  require('./getEntries').entry;
const appEntry = { 'm/index': path.join(__dirname, '../src/js/m/index.js')};
const entry = projectType === 'app' ? appEntry : activityEntry;


const config = {
	entry: entry,
	dev: {
		env: {
			NODE_ENV: JSON.stringify('development')
		},
		port: 3004,
		hostName: 'localhost',
		autoOpenBrowser: true,
    publicPath: '/',
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
    env: {
      NODE_ENV: JSON.stringify('production')
    },
    assetsRoot: path.resolve(__dirname, '../dist'),
  }
}

module.exports = config;