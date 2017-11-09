/**
 * Created by cc on 2017/11/1.
 */
import axios from 'axios';
import qs from 'qs';

/**
 * 设置微信title
 * @example
 * const timeArray = setWechatTitle('title')
 *
 * @param {string} title 要设置的微信title
 */
export function setWechatTitle(title) {
  document.title = title;
  const agent = navigator.userAgent.toLowerCase();
  // 兼容ios微信
  if (/iphone|ipad|ipod/.test(agent)) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', '/favicon.ico');
    const iframeCallback = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe);
  }
  window.show = () => title;
  try {
    window.demo && window.demo.setTitleText(title);
  } catch (e) {
    console.log(e);
  }
}

/**
 * ajax请求函数
 * @example
 * const data = await request(url, params)
 *
 * @param {Object} params ajax请求参数
 * @param {string} method ajax请求方法
 * @returns {Promise} 返回promise对象
 */
export function request(url, params, method = 'post', timeout = 60000) {
  console.log(url);
  return axios({
    method,
    url,
    data: qs.stringify(params),
    responseType: 'json',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout
  })
    .then((response) => {
      const { data } = response;
      console.groupCollapsed(url);
      console.table(data);
      console.groupEnd();
      if (response.status !== 200 && response.status !== 304 && response.status !== 400) {
        const errorData = {
          ...data,
          url: rul,
          params: reqParams,
          method: method || 'POST'
        };
        return errorData;
      }
      return data;
    })
    .catch((error) => {
      const errorData = {
        code: '-1',
        msg: error.response ? error : error.message,
        url,
        params,
        method,
      };
      console.groupCollapsed(url);
      console.table(errorData);
      console.groupEnd();
      return errorData;
    });
}

/**
 * 获取url参数
 * getUrlParameter()
 */
export function getUrlParameter() {
  const url = window.location.search;
  const theRequest = {};
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i += 1) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}
