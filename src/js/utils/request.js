/*
 * 请求接口
 */
import axios from 'axios';
import qs from 'qs';

export class ApiError extends Error {
  constructor({
    ret = -1, // 包括状态ret
    data = null, // 后台返回数据
    status = null, // 响应头状态
    message = ''
  }) {
    super(message);
    this.ret = ret;
    this.status = status;
    this.data = data;
  }
}

// function ApiError() {
//   console.log('errosdfsdfsdfsdfr');
// }

function checkStatus(response) {
  if (response) {
    if (response.status === 200 || response.status === 304 || response.status === 400) {
      return Promise.resolve(response);
    }
    return Promise.reject(new ApiError({
      data: response.data,
      status: response.status,
      message: '访问错误'
    }));
  }

  return Promise.reject(new ApiError({
    message: '访问错误'
  }));
}

export function post(url, data, timeout = 60000) {
  return axios({
    method: 'post',
    // baseURL: 'http://localhost:3000/',
    url,
    data: qs.stringify(data),
    timeout,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    responseType: 'json'
  }).then(
    (response) => {
      return checkStatus(response);
    },
    (response) => {
      console.log('reject response', response);
      return Promise.reject(new ApiError({
        data: response.data,
        status: response.status,
        message: '网络异常，请稍后再试'
      }));
    }
  ).catch((err) => {
    console.log(err, err.status, err.data);
    layer.msg(err.message);
    return Promise.reject(err);
  });
}
