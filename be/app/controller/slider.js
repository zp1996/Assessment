'use strict';

module.exports = app => {
  class SliderController extends app.Controller {
    * get() {
      this.ctx.body = {
        list: [],
        code: 200
      };
    }
  }
  return SliderController;
};
