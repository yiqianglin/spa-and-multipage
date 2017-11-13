const glob = require('glob');
const path = require('path');
const fs = require('fs');
const argv = require('yargs').argv;

const { projectType, env } = argv;
const srcPath = path.join(__dirname, '../src/'); //源码路径
const notRequirePath = ['utils', 'common', 'component', 'less', 'config', 'images', 'app'];
// 取得所有静态目录
let allPath = glob.sync(srcPath + "*/");

module.exports = {
  entry: projectType === 'app' ? getAppEntries() : getPcEntries(),
  pcEntries: getPcEntries(),
  appEntries: getAppEntries()
}

/*
 return json object
 example
 { 'activity/forshoulei': 'E:/xunlei/daikuan/src/js/activity/forshoulei.js' }
 */
function getPcEntries() {
  let jsPath;
  let entries = {};
  jsPath = glob.sync(srcPath + 'js/!(utils|common|config|lib|m)/*.js');
  jsPath = jsPath.filter(v => {
    let jsPath_isLegal = true;
    notRequirePath.forEach((path) => {
      if (new RegExp(path).test(v)) {
        jsPath_isLegal = false;
      }
    });
    // 验证js对应的html模板在不在，不在的不放入入口，以免HtmlWebpackPlugin找不到对应模板
    let pathname = v.match(/(.*)src\/js\/(.*).js/)[2];
    let flag = fs.existsSync(srcPath + '/html/' + pathname + '.html') || fs.existsSync(srcPath + '/html/' + pathname + '.art');
    if (!flag) {
      jsPath_isLegal = false;
      console.warn('有js文件并未对应其html模板', pathname);
    }
    return jsPath_isLegal;
  });

  var entry, dirname, pathname;
  jsPath.forEach(v => {
    entry = v;
    pathname = entry.match(/(.*)src\/js\/(.*).js/)[2];
    entries[pathname] = entry;
  });
  return entries;
}

/*
 return json object
 example
 { 'm/index': 'E:/xunlei/daikuan/src/js/m/index.js' }
 */
function getAppEntries() {
  let jsPath;
  let entries = {};
  jsPath = glob.sync(srcPath + 'js/m/*.js');
  jsPath = jsPath.filter(v => {
    let jsPath_isLegal = true;
    notRequirePath.forEach((path) => {
      if (new RegExp(path).test(v)) {
        jsPath_isLegal = false;
      }
    });
    // 验证js对应的html模板在不在，不在的不放入入口，以免HtmlWebpackPlugin找不到对应模板
    let pathname = v.match(/(.*)src\/js\/(.*).js/)[2];
    let flag = fs.existsSync(srcPath + '/html/' + pathname + '.html') || fs.existsSync(srcPath + '/html/' + pathname + '.art');
    if (!flag) {
      jsPath_isLegal = false;
      console.warn('有js文件并未对应其html模板', pathname);
    }
    return jsPath_isLegal;
  });

  var entry, dirname, pathname;
  jsPath.forEach(v => {
    entry = v;
    pathname = entry.match(/(.*)src\/js\/(.*).js/)[2];
    entries[pathname] = entry;
  });
  return entries;
}

function getAllEntries() {
  let jsPath;
  let entries = {};
  jsPath = glob.sync(srcPath + 'js/!(utils|common|config|lib)/*.js');
  jsPath = jsPath.filter(v => {
    let jsPath_isLegal = true;
    notRequirePath.forEach((path) => {
      if (new RegExp(path).test(v)) {
        jsPath_isLegal = false;
      }
    });
    // 验证js对应的html模板在不在，不在的不放入入口，以免HtmlWebpackPlugin找不到对应模板
    let pathname = v.match(/(.*)src\/js\/(.*).js/)[2];
    let flag = fs.existsSync(srcPath + '/html/' + pathname + '.html') || fs.existsSync(srcPath + '/html/' + pathname + '.art');
    if (!flag) {
      jsPath_isLegal = false;
      console.warn('有js文件并未对应其html模板', pathname);
    }
    return jsPath_isLegal;
  });

  var entry, dirname, pathname;
  jsPath.forEach(v => {
    entry = v;
    pathname = entry.match(/(.*)src\/js\/(.*).js/)[2];
    entries[pathname] = entry;
  });
  return entries;
}