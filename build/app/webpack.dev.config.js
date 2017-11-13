const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // webpack html 打包模块
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const entry = require('../../config/getEntries').appEntries;
const config = require('../../config/config');
const baseConfig = require('./webpack.base.config');
const argv = require('yargs').argv;

const srcPath = path.join(__dirname, '../../src/'); // 源码路径
const plugin_entry = JSON.parse(JSON.stringify(entry));
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
  console.log(fs.existsSync(`${srcPath}/html/${name}.art`));
  plugins.push(new HtmlWebpackPlugin({
    favicon: path.join(__dirname, '../../favicon.ico'),
    title: '',
    contentPath: `${config.dev.publicPath}`,
    filename: 'm/cashloanmarket/index.htm',
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


entry.vendor = ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'axios', 'core-js/fn/promise'];
const _config = {
  entry,
  output: {
    publicPath: `${config.dev.publicPath}/`
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
