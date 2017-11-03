const path = require('path');
const webpack = require('webpack');

const config = require('../config/config');
const postcssConfig = require('../config/postcss.config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const postcssSprites = require('postcss-sprites');
const updateRule = require('postcss-sprites/lib/core').updateRule;
const makeSpritesheetPath = require('postcss-sprites/lib/core').makeSpritesheetPath;

// let entries = {};
// 多入口设置polyfill？
// entries['polyfill'] = ['babel-polyfill'];
// console.log('\n', '\n');
// console.log(entries);
// console.log('\n', '\n');
module.exports = {
  module: {
    rules: [
      // {  // 默认是png模板
      //     test: /\.html$/,
      //     use: [ {
      //         loader: 'html-loader',
      //         options: {
      //             minimize: true,
      //             removeComments: false,
      //             collapseWhitespace: false
      //         }
      //     }],
      // },
      // {
      //     test: /\.(ejs)$/,
      //     loader: 'ejs-compiled-loader',
      // },
      {
        test: /\.art$/,
        loader: 'art-template-loader',
        options: {
          // art-template options (if necessary)
          // @see https://github.com/aui/art-template
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
              limit: 100,
              publicPath: '/cashloan-web-market/'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1 // 允许配置css-loader应用于@import资源之前的加载器数量。
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // webpack需要ident在使用的options时候{Function}/require使用identifier（）（复杂选项）。ident只要它是独一无二的，可以自由命名。建议把它命名（ident: 'postcss'）
                plugins: postcssConfig
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1 // 允许配置css-loader应用于@import资源之前的加载器数量。
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // webpack需要ident在使用的options时候{Function}/require使用identifier（）（复杂选项）。ident只要它是独一无二的，可以自由命名。建议把它命名（ident: 'postcss'）
                plugins: postcssConfig
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory'
          }
        ],
        // include: [
        //   path.resolve(__dirname, 'src/js/app'),
        //   path.resolve(__dirname, 'src/js/index'),
        //   path.resolve(__dirname, 'src/js/activity'),
        //   path.resolve(__dirname, 'src/js/app'),
        //   path.resolve(__dirname, 'src/js/utils')
        // ],
        exclude: [/node_modules/, path.join(__dirname, '../src/js/lib/')]
      }
      // {
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   }, {
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // },
      // },
      // {
      //   test: require.resolve('swiper'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'swiper'
      //   }]
      // }
    ]
  },
  externals: {
    // 不想打包的模块
    moment: true // cdn
    // $: "jquery",
    // jQuery: "jquery",
    // "window.jQuery": "jquery"
  },
  resolve: {
    // 配置别名，在项目中可缩减引用路径
    alias: {
      util: `${__dirname}/../src/utils/index.js`,
      model: `${__dirname}/../src/model/index.js`,
      config: `${__dirname}/../src/config/index.js`,
      css: `${__dirname}/../src/css`,
      images: `${__dirname}/../src/images`,
      js: `${__dirname}/../src/js`,
      html: `${__dirname}/../src/html`,
      component: `${__dirname}/../src/component`
    }
  },
  plugins: [
    // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
    // new webpack.NoEmitOnErrorsPlugin(),

    // 将公共代码抽离出来合并为一个文件
    new webpack.ProvidePlugin({
      // $: "jquery",
      // jQuery: "jquery",
      // "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: ['polyfill', 'vendor'], minChunks: Infinity }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash:8].css', // 这个路径为什么能随便写，也没影响
      // publicPath: process.env.NODE_ENV === 'production' ? '/cashloan-web-market/' : '/cashloan-web-market/',
      allChunks: true // 这个新加上去，并不知道有什么用
      // 疑问：这plugin会将所有的css，less等全都打包到一个css，可以手动指定分隔css，但是动态改变不行。extract-chunk-text-webpack-plugin
    }),
    new FriendlyErrorsPlugin()
  ]
};

function spritesGroupBy(image) {
  const groups = /\/images\/sprite\/(.*?)\/.*/gi.exec(image.url);
  const groupName = groups ? groups[1] : group;
  console.log(groupName);
  image.retina = true;
  image.ratio = 1;
  if (groupName) {
    let ratio = /@(\d+)x$/gi.exec(groupName);
    if (ratio) {
      ratio = ratio[1];
      while (ratio > 10) {
        ratio /= 10;
      }
      image.ratio = ratio;
    }
  }
  return Promise.resolve(groupName);
}

function spritesOnUpdateRule(isDev, rule, comment, image) {
  updateRule(rule, comment, image);
}

function spritesOnSaveSpritesheet(isDev, opts, groups) {
  return makeSpritesheetPath(opts, groups);
}
