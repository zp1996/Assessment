import { get } from 'utils/request';

export function query() {
  return get('/').then((res) => {
    console.log(res);
  });
}
