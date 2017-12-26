import { postData, getData } from './base';

export function get() {
  return getData('/menu/getList', '头部导航');
}

export function add(data) {
  return postData('/menu/add', data);
}

export function update(data) {
  return postData('/menu/update', data);
}

export function del(id) {
  return postData('/menu/delete', id);
}
