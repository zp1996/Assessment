import { get, post } from 'utils/request';

export function getData(path, name = '') {
  return new Promise((resolve, reject) => {
    get(path).then((res) => {
      const { code, msg } = res;
      if (code === 200) {
        resolve(msg);
      } else {
        // 暂时忽略错误,后期加上报
        reject({
          code,
          msg: `${name}数据获取失败, 请稍后再试`,
        });
      }
    });
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
