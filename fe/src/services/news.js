import { postData, getData } from './base';

export function get(page = 1) {
  return getData(`/news/getNewsList/${page}`, '新闻列表');
}

export function add(data) {
  return postData('/news/add', data);
}

export function update(data) {
  return postData('/news/update', data);
}

export function del(data) {
  return postData('/news/delete', data);
}

export function getArticle(id) {
  return getData(`/news/getArticle/${id}`, '新闻详情');
}
