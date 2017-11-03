/**
 * Created by cc on 2017/11/3.
 */
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.config');
const argv = require('yargs').argv;

webpack(webpackConfig, (err, stats) => {
  if (err) throw err;
});

