import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * get请求
 */
export function get(url, options = { method: 'GET' }) {
  return fetch(`/api${url}`, options)
    .then(checkStatus)
    .then(data => data.json())
    .then(data => data)
    .catch(() => ({
      code: 404,
      msg: '请求失败，请稍后再试！',
    }));
}

/**
 * post请求
 */
export function post() {

}
