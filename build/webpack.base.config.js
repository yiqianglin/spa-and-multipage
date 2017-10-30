const path = require('path');

const webpack = require('webpack');

const config = require('../config/config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
let postcssSprites = require('postcss-sprites');
let updateRule = require('postcss-sprites/lib/core').updateRule;
let makeSpritesheetPath = require('postcss-sprites/lib/core')
    .makeSpritesheetPath;

// let entries = {};

// baseConfig.jsPath.forEach(v => {
//     entry = v;
//     pathname = entry.match(/(.*)src\/js\/(.*).js/)[2];
//     entries[pathname] = ('./' + entry);
// });
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
                loader: "art-template-loader",
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
                            publicPath: '/'
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", 
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1 //允许配置css-loader应用于@import资源之前的加载器数量。
                            }
                        },
                        {
                          loader: 'postcss-loader',
                          options: {
                            ident: 'postcss', // webpack需要ident在使用的options时候{Function}/require使用identifier（）（复杂选项）。ident只要它是独一无二的，可以自由命名。建议把它命名（ident: 'postcss'）
                            plugins: (loader) => [
                              require('autoprefixer')({
                                pc: [
                                    'last 3 versions',
                                    'Explorer >= 8',
                                    'Chrome >= 21',
                                    'Firefox >= 1',
                                    'Edge 13'
                                ]
                              }),
/*                                require('postcss-sprites')({
                                    retina: true,	// 是否识别分辨率标识，默认为true。分辨率标识指的是类似@2x的文件名标识，比如存在两个图标文件logo.png和logo@2x.png并且style文件中对两张图标都有引用，如果配置retina:true，boi将把两种分辨率的图片分别合并为一张sprites图片，否则会编译到同一张sprites图片里
                                    verbose: true,	// 将插件输出打印到控制台
                                    spritePath: '../dist/images', // 雪碧图合并后存放地址，相对路径
                                    stylesheetPath: '../dist/css/index',	// 保存输出样式表的文件夹的相对路径。如果为空，则将使用CSS文件的路径。
                                    basePath: './',	// Your base path that will be used for images with absolute CSS urls.
                                    spritesmith: {	// 将图像转换为精简图和坐标图。
                                        padding: 2
                                    },
                                    filterBy(image) {
                                        // 定义过滤器函数，该函数将处理在样式表中创建的图像列表。
                                        // 每个函数必须返回一个Promise应解决或拒绝的函数。

                                        console.log(image.url);
                                        console.log('能不能找到/images/sprite/：', image.url.indexOf('/images/sprite/') !== -1);
                                        if (image.url.indexOf('/images/sprite/') === -1) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                    },
                                    groupBy(image) {
                                      // 定义将处理您的样式表中创建的图像列表的组函数。
                                      return spritesGroupBy(image);
                                    },
                                    hooks: {
                                      // 挂钩 定义是否在文件名中搜索视网膜标记。
                                      onUpdateRule(rule, comment, image) {
                                      	// Hook允许重写图像的CSS输出。// 更新生成后的规则，这里主要是改变了生成后的url访问路径
                                        return spritesOnUpdateRule(true, rule, comment, image);
                                      },
                                      onSaveSpritesheet(opts, groups) {
                                      	// Hook允许重写生成的spritesheet的数据。
                                        return spritesOnSaveSpritesheet(true, opts, groups);
                                      }
                                    }
                                })*/
                            ]
                          }
                        }
                    ]                    
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { 
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1 //允许配置css-loader应用于@import资源之前的加载器数量。
                            }
                        },
                        {
                          loader: 'postcss-loader',
                          options: {
                            ident: 'postcss', // webpack需要ident在使用的options时候{Function}/require使用identifier（）（复杂选项）。ident只要它是独一无二的，可以自由命名。建议把它命名（ident: 'postcss'）
                            plugins: (loader) => [
                              require('autoprefixer')({
                                pc: [
                                    'last 3 versions',
                                    'Explorer >= 8',
                                    'Chrome >= 21',
                                    'Firefox >= 1',
                                    'Edge 13'
                                ]
                              }),
/*                                require('postcss-sprites')({
                                    retina: true,	// 是否识别分辨率标识，默认为true。分辨率标识指的是类似@2x的文件名标识，比如存在两个图标文件logo.png和logo@2x.png并且style文件中对两张图标都有引用，如果配置retina:true，boi将把两种分辨率的图片分别合并为一张sprites图片，否则会编译到同一张sprites图片里
                                    verbose: true,	// 将插件输出打印到控制台
                                    spritePath: '../dist/images', // 雪碧图合并后存放地址，相对路径
                                    stylesheetPath: '../dist/css/index',	// 保存输出样式表的文件夹的相对路径。如果为空，则将使用CSS文件的路径。
                                    basePath: './',	// Your base path that will be used for images with absolute CSS urls.
                                    spritesmith: {	// 将图像转换为精简图和坐标图。
                                        padding: 2
                                    },
                                    filterBy(image) {
                                        // 定义过滤器函数，该函数将处理在样式表中创建的图像列表。
                                        // 每个函数必须返回一个Promise应解决或拒绝的函数。

                                        console.log(image.url);
                                        console.log('能不能找到/images/sprite/：', image.url.indexOf('/images/sprite/') !== -1);
                                        if (image.url.indexOf('/images/sprite/') === -1) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                    },
                                    groupBy(image) {
                                        // 定义将处理您的样式表中创建的图像列表的组函数。
                                        return spritesGroupBy(image);
                                    },
                                    hooks: {
                                        // 挂钩 定义是否在文件名中搜索视网膜标记。
                                        onUpdateRule(rule, comment, image) {
                                            // Hook允许重写图像的CSS输出。// 更新生成后的规则，这里主要是改变了生成后的url访问路径
                                            // var spriteUrl = image.spritePath.replace('dist', '');
                                            // image.spriteUrl = argv.local
                                            //     ? spriteUrl
                                            //     : `/${project[config.appName].contentPath}${spriteUrl}?t=${+new Date()}`;
                                            console.log('--------*****--------')
                                            console.log(image)
                                            return spritesOnUpdateRule(true, rule, comment, image);
                                        },
                                        onSaveSpritesheet(opts, groups) {
                                            // Hook允许重写生成的spritesheet的数据。
                                            return spritesOnSaveSpritesheet(true, opts, groups);
                                        }
                                    }
                                })*/
                            ]
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
                exclude: /node_modules/
            },
            {
              test: require.resolve('jquery'),
              use: [{
                loader: 'expose-loader',
                options: 'jQuery'
              },{
                loader: 'expose-loader',
                options: '$'
              }]
            },
            {
              test: require.resolve('swiper'),
              use: [{
                loader: 'expose-loader',
                options: 'swiper'
              }]
            },
            // {  没用
            //   test: require.resolve('layer'),
            //   use: [{
            //     loader: 'expose-loader',
            //     options: 'layer'
            //   }]
            // }
        ]
    },
    externals: {
      moment: true // cdn
    },
    resolve: {
        // 配置别名，在项目中可缩减引用路径
        alias: {
          util: __dirname + '/../src/utils/index.js',
          model: __dirname + '/../src/model/index.js',
          config: __dirname + '/../src/config/index.js',
          css:  __dirname + '/../src/css',
          images:  __dirname + '/../src/images',
          js: __dirname + '/../src/js',
          html: __dirname + '/../src/html',
          component: __dirname + '/../src/component'
        }
    },
    plugins: [
        // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
        // new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // 将公共代码抽离出来合并为一个文件
        new webpack.optimize.CommonsChunkPlugin({name:['polyfill'], minChunks:Infinity}),
        new ExtractTextPlugin({
          filename: ('css/[name].[chunkhash:8].css'),    // 这个路径为什么能随便写，也没影响
          allChunks: true   // 这个新加上去，并不知道有什么用
          // 疑问：这plugin会将所有的css，less等全都打包到一个css，可以手动指定分隔css，但是动态改变不行。extract-chunk-text-webpack-plugin
        }),
        new FriendlyErrorsPlugin()
    ]
};



function spritesGroupBy(image) {
    console.log('******************************************')
    console.log(image);
    let groups = /\/images\/sprite\/(.*?)\/.*/gi.exec(image.url);
    let groupName = groups ? groups[1] : group;
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