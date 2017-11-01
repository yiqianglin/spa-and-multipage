const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const argv = require('yargs').argv;

const { projectType } = argv;

const postcssConfig = {
  autoprefixer: {
    // 自动前缀的配置
    pc: [
      'last 3 versions',
      'Explorer >= 8',
      'Chrome >= 21',
      'Firefox >= 1',
      'Edge 13'
    ],
    app: ['Android >= 4', 'iOS >= 6']
  },
  postcssPxtorem: {
    root_value: '100', // 基准值 html{ font-zise: 20px; }
    prop_white_list: [], // 对所有 px 值生效
    minPixelValue: 3 // 忽略 1px 值
  },
}

const config = [];
if (projectType === 'app') {
  config.push(
    autoprefixer({
      browsers: postcssConfig.autoprefixer['app']
    }),
    pxtorem(postcssConfig.postcssPxtorem)
  );
} else {
  config.push(
    autoprefixer({
      browsers: postcssConfig.autoprefixer['app']
    })
  );
}

module.exports = config;

