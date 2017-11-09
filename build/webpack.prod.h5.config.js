process.env.NODE_ENV = 'production';
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // webpack html 打包模块
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config/config');
const baseConfig = require('./webpack.base.config');

const srcPath = path.join(__dirname, '../src/'); // 源码路径
const entry = config.entry;
const plugin_entry = JSON.parse(JSON.stringify(config.entry));

const plugins = [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
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
  // console.log('entry[name]:', name, plugin_entry[name]);
  const isHtml = fs.existsSync(`${srcPath}/html/${name}.html`);
  const isTemplate = fs.existsSync(`${srcPath}/html/${name}.art`);
  console.log(isHtml ? `src/html/${name}.html` : `src/html/${name}.art`);
  plugins.push(new HtmlWebpackPlugin({
    favicon: path.join(__dirname, '../favicon.ico'),
    title: '',
    contentPath: process.env.NODE_ENV === 'production' ? `${config.build.publicPath}` : `${config.dev.publicPath}`,
    filename: `WEB-INF/m/cashloanmarket/index.shtml`,
    template: isHtml ? `src/html/${name}.html` : `src/html/${name}.art`,
    inject: true,
    minify: {
      // 压缩HTML文件
      removeComments: false, // 移除HTML中的注释
      collapseWhitespace: false // 删除空白符与换行符
    },
    chunks: ['vendor', 'polyfill', name, 'manifest'] // 需要引入的chunk，不配置就会引入所有页面的资源
  }));
});

entry.vendor = ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react', 'axios', 'core-js/fn/promise'];
module.exports = webpackMerge(baseConfig, {
  entry,
  output: {
    path: path.join(__dirname, '../dist/'), // 构建目录
    publicPath: process.env.NODE_ENV === 'production' ? `${config.build.publicPath}/` : `${config.dev.publicPath}/`,
    filename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 0,
                minimize: true // css压缩
              }
            }
          ]
        })
      }
    ]
  },
  plugins
});
