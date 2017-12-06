import { getData } from './base';

export function get() {
  return getData('/slider/get', '宣传banner');
}
