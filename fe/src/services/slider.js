import { postData, getData } from './base';

export function get() {
  return getData('/slider/get', '宣传banner');
}

export function add(data) {
  return postData('/slider/add', data);
}

export function update(data) {
  return postData('/slider/update', data);
}

export function del(data) {
  return postData('/slider/delete', data);
}
