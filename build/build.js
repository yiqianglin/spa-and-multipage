/**
 * Created by cc on 2017/11/3.
 */
const argv = require('yargs').argv;
process.env.NODE_ENV = 'production';

// const { prodType } = argv;
// process.env.PROD_TYPE = prodType

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.config');


webpack(webpackConfig, (err, stats) => {
  if (err) throw err;
});

