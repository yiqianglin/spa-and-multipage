process.env.NODE_ENV = 'production';
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack html 打包模块
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config/config');
const baseConfig = require('./webpack.base.config');

const srcPath = path.join(__dirname, '../src/');//源码路径
let entry = config.entry;
let plugin_entry = JSON.parse(JSON.stringify(config.entry));

let plugins = [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
];

Object.keys(plugin_entry).forEach(name => {
  // console.log('entry[name]:', name, plugin_entry[name]);
  let isHtml = fs.existsSync(srcPath + '/html/' + name + '.html');
  let isTemplate = fs.existsSync(srcPath + '/html/' + name + '.art');
  console.log(isHtml ? 'src/html/' + name + '.html' : 'src/html/' + name + '.art');
  plugins.push(new HtmlWebpackPlugin({
    //favicon: baseConfig.srcPath + '/favicon.ico',
    title: '自定义的title',
    filename: name + '.html',
    template: isHtml ? 'src/html/' + name + '.html' : 'src/html/' + name + '.art',
    inject: true,
    minify: {    //压缩HTML文件
      removeComments: false,    //移除HTML中的注释
      collapseWhitespace: false    //删除空白符与换行符
    },
    chunks: ['vendor', 'polyfill', name], // 需要引入的chunk，不配置就会引入所有页面的资源
  }));
});

// entry['vendor'] = ['./src/js/lib/jquery-1.10.2.min.js', './src/js/lib/layer/skin/default/layer.css', './src/js/lib/layer/layer.js', './src/js/lib/jquery.qrcode.min'];
entry['polyfill'] = ['core-js/es6/promise'];

module.exports = webpackMerge(baseConfig, {
  entry: entry,
  output: {
    path: path.join(__dirname, '../dist/'), //构建目录
    publicPath: '/cashloan-web-market/',
    filename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 0,
                minimize: true  // css压缩
              }
            }
          ]
        })
      }
    ]
  },
  plugins: plugins
});