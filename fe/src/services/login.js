import { postData } from './base';

export function login(data) {
  return postData('/be/login', data);
}
