import { postData, getData } from './base';

export function add(data) {
  return postData('/introduction/add', data);
}

export function update(data) {
  return postData('/introduction/update', data);
}

export function get() {
  return getData('/introduction/get');
}
