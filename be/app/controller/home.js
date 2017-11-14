'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = {
        msg: 'hi, egg'
      };
    }
  }
  return HomeController;
};
