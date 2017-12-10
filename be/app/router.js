'use strict';

module.exports = app => {
  app.get('/', 'home.index');

  /* Banner图相关接口 */
  app.get('/slider/get', 'slider.get')

  /* 后台登录接口 */
  app.post('/be/login', 'be.login');
};
