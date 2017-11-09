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
const pcWebpackConfig = require('./webpack.prod.pc.config');
const h5WebpackConfig = require('./webpack.prod.h5.config');



var spinner = ora('building for production...');
spinner.start();
del('dist/**').then((paths) => {
  console.log('delete finished');
  // webpack(pcWebpackConfig, (err, stats) => {
  //   if (err) throw err;
  // });
  webpack(h5WebpackConfig, (err, stats) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
});

