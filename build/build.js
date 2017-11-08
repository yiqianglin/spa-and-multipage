/**
 * Created by cc on 2017/11/3.
 */
const argv = require('yargs').argv;
process.env.NODE_ENV = 'production';

const { prodType, env } = argv;

const path = require('path');
const ora = require('ora');
const del = require('del');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.config');



var spinner = ora('building for production...');
spinner.start();
del(`${config.build.assetsRoot}/**`)
// webpack(webpackConfig, (err, stats) => {
//   if (err) throw err;
// });

