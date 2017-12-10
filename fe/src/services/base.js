import { get, post } from 'utils/request';

export function getData(path, name) {
  return get(path).then((res) => {
    const { code, msg } = res;
    if (code && code === 200) {
      delete res.code;
      delete res.msg;
    } else if (!msg) {
      res.msg = `${name}数据获取失败, 请稍后再试`;
    }
    return res;
  });
}

export function postData(path, data) {
  return new Promise((resolve, reject) => {
    try {
      const body = JSON.stringify(data);
      return post(path, body).then((res) => {
        const { code, msg } = res;
        if (code && code !== 200) {
          reject({ code, msg });
        } else {
          resolve(msg);
        }
      });
    } catch (err) {
      reject({
        code: 400,
        msg: '发生异常错误，请检查所填内容',
      });
    }
  });
}
