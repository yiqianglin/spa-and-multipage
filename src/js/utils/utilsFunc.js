/**
 * Created by cc on 2017/10/31.
 */
// 判断IE版本
export function checkIEVersonr(version) {
  const ua = navigator.userAgent.toLowerCase();
  if (window.ActiveXObject) {
    const ie = ua.match(/msie ([\d.]+)/)[1];
    // 获取版本
    let ieVersion = 6;
    if (ie.indexOf('7') > -1) {
      ieVersion = 7;
    }
    if (ie.indexOf('8') > -1) {
      ieVersion = 8;
    }
    if (ie.indexOf('9') > -1) {
      ieVersion = 9;
    }
    if (ie.indexOf('10') > -1) {
      ieVersion = 10;
    }
    if (ie.indexOf('11') > -1) {
      ieVersion = 11;
    }
    return ieVersion <= version;
  }
  return false;
}

export function toQueryParams (str) {
  if (!str) return {};
  str = str.trim().slice(1);
  var queries = str.split('&'), result = {};
  for (var i = 0, len = queries.length; i < len; i++) {
    var pair = queries[i].split('=');
    if (pair[0]) {
      var key = decodeURIComponent(pair.shift()),
        value = pair.length > 1 ? pair.join('=') : pair[0];
      if (value != undefined) {
        value = value.replace(/\+/g, " ");
        value = decodeURIComponent(value);
      }
      if (key in result) {
        if (!(result[key] instanceof Array)) {
          result[key] = [result[key]];
        }
        result[key].push(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}