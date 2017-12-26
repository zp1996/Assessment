'use strict';

module.exports = app => {
  /* 对前台接口 */
  app.get('/home', 'home.index');
  app.get('/news/:page', 'home.news');

  /* 后台登录接口 */
  app.post('/be/login', 'be.login');

  /* 公司介绍相关接口 */
  app.post('/introduction/add', 'introduction.add');
  app.post('/introduction/update', 'introduction.update');
  app.get('/introduction/get', 'introduction.get');
  app.get('/introduction/getCompany', 'introduction.getCompany');
  app.get('/introduction/getConcat', 'introduction.getConcat');

  /* 上传图片接口 */
  app.post('/upload', 'upload.index');

  /* Banner图相关接口 */
  app.get('/slider/get', 'slider.get');
  app.post('/slider/add', 'slider.add');
  app.post('/slider/update', 'slider.update');
  app.post('/slider/delete', 'slider.delete');

  /* 新闻媒体相关接口 */
  app.post('/news/add', 'news.add');
  app.post('/news/delete', 'news.delete');
  app.post('/news/update', 'news.update');
  app.get('/news/getContent/:id', 'news.getContent');
  app.get('/news/getArticle/:id', 'news.getArticle');
  app.get('/news/getNewsList/:page', 'news.getNewsList');

  /* 导航相关接口 */
  app.post('/menu/add', 'menu.add');
  app.post('/menu/update', 'menu.update');
  app.get('/menu/getList', 'menu.getList');
  app.post('/menu/delete', 'menu.delete');
};
