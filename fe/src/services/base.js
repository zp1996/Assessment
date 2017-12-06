import { get } from 'utils/request';

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
