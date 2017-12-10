import fetch from 'dva/fetch';

function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.code = status;
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
    .catch(() => ({
      code: 404,
      msg: '请求失败，请稍后再试！',
    }));
}

/**
 * post请求
 */
export function post(url, body) {
  return fetch(`/api${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  .then(checkStatus)
  .then(data => data.json())
  .then(data => data)
  .catch((err = {}) => {
    const { code = 404, message = '请求失败，请稍后再试！' } = err;
    return { code, msg: message };
  });
}
