'use strict';

module.exports = app => {
  app.get('/', 'home.index');

  /* 后台接口 */
  app.get('/be/demo', 'be.demo');
};
