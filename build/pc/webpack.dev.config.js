const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // webpack html 打包模块
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../../config/config');
const baseConfig = require('./webpack.base.config');
const argv = require('yargs').argv;

const srcPath = path.join(__dirname, '../../src/'); // 源码路径
const entry = config.entry;
const plugin_entry = JSON.parse(JSON.stringify(config.entry));
const { projectType } = argv;

Object.keys(entry).forEach((name) => {
  entry[name] = [`${__dirname}/dev.client.js`].concat(entry[name]);
});

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new CopyWebpackPlugin([
    {
      from: 'src/js/lib',
      to: 'js/lib'
    },
    {
      from: 'src/css/lib',
      to: 'css/lib'
    }
  ])
];
Object.keys(plugin_entry).forEach((name) => {
  const isHtml = fs.existsSync(`${srcPath}/html/${name}.html`);
  const isTemplate = fs.existsSync(`${srcPath}/html/${name}.art`);
  plugins.push(new HtmlWebpackPlugin({
    favicon: path.join(__dirname, '../../favicon.ico'),
    title: '',
    contentPath: process.env.NODE_ENV === 'production' ? `${config.build.publicPath}` : `${config.dev.publicPath}`,
    filename: projectType === 'app' ? `m/cashloanmarket/index.htm` : `${name}.htm`,
    template: isHtml ? `src/html/${name}.html` : `src/html/${name}.art`,
    inject: true,
    minify: {
      // 压缩HTML文件
      removeComments: false, // 移除HTML中的注释
      collapseWhitespace: false // 删除空白符与换行符
    },
    showErrors: true,
    chunks: ['vendor', name, 'polyfill', 'manifest'] // 需要引入的chunk，不配置就会引入所有页面的资源
  }));
});

if (projectType === 'app') {
  entry.vendor = ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'axios', 'core-js/fn/promise'];
} else {
  // entry['vendor'] = ['./src/js/lib/jquery-1.10.2.min.js', './src/js/lib/layer/skin/default/layer.css', './src/js/lib/layer/layer.js', './src/js/lib/jquery.qrcode.min'];
  entry['polyfill'] = ['core-js/fn/promise'];
}
const _config = {
  entry,
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? `${config.build.publicPath}/` : `${config.dev.publicPath}/`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: [path.join(__dirname, '../src/js')],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      }
    ]
  },
  plugins
};

module.exports = webpackMerge(baseConfig, _config);
