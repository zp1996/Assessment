'use strict';

module.exports = app => {
  app.get('/', 'home.index');

  /* Banner图相关接口 */
  app.get('/slider/get', 'slider.get');

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
};
