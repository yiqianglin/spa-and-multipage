const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack html 打包模块
const webpackMerge = require('webpack-merge');
const config = require('../config/config');
const baseConfig = require('./webpack.base.config');

const srcPath = path.join(__dirname, '../src/');//源码路径
let entry = config.entry;
let plugin_entry = JSON.parse(JSON.stringify(config.entry));

Object.keys(entry).forEach(function (name) {
  entry[name] = [__dirname + '/dev.client.js'].concat(entry[name])
})

let plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
]
Object.keys(plugin_entry).forEach(name => {
    let isHtml = fs.existsSync(srcPath + '/html/' + name + '.html');
    let isTemplate = fs.existsSync(srcPath + '/html/' + name + '.art');
    console.log(isHtml ? 'src/html/' + name + '.html' : isTemplate ?  'src/html/' + name + '.art' : '啥都没有啊，那就没有HtmlWebpackPlugin了');
    plugins.push(new HtmlWebpackPlugin({
        //favicon: baseConfig.srcPath + '/favicon.ico',
        title: '自定义的title',
        filename: name + '.html',
        template: isHtml ? 'src/html/' + name + '.html' : 'src/html/' + name + '.art',
        inject: true,
        minify:{    //压缩HTML文件
            removeComments: false,    //移除HTML中的注释
            collapseWhitespace: false    //删除空白符与换行符
        },
        chunks: ['vendor', name, 'polyfill'], // 需要引入的chunk，不配置就会引入所有页面的资源
    }));
});

entry['vendor'] = ['./src/js/lib/jquery-1.10.2.min.js', './src/js/lib/layer/skin/default/layer.css', './src/js/lib/layer/layer.js', './src/js/lib/jquery.qrcode.min'];
let _config = {
    entry: entry,
    output: {
      publicPath: '/',
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
          },
        ]
    },
    plugins: plugins
}

module.exports = webpackMerge(baseConfig, _config);