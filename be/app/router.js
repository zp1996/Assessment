'use strict';

module.exports = app => {
  /* 对前台接口 */
  app.get('/home', 'home.index');

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
};
