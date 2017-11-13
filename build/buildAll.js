/**
 * Created by cc on 2017/11/3.
 */
process.env.NODE_ENV = 'production';
const argv = require('yargs').argv;
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const del = require('del');
const webpack = require('webpack');
const pcWebpackConfig = require('./pc/webpack.prod.config');
const appWebpackConfig = require('./app/webpack.prod.config');

var spinner = ora('building for production...');
spinner.start();
del('dist/**').then((paths) => {
  console.log('delete finished');
  webpack(pcWebpackConfig, (err, stats) => {
    if (err) throw err;
    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })}\n\n`
    );
  });
  webpack(appWebpackConfig, (err, stats) => {
    if (err) throw err;
    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })}\n\n`
    );
  });
  console.log(chalk.cyan('  Build complete.\n'));
});

