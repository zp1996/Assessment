'use strict';

module.exports = app => {
  class BeController extends app.Controller {
    * demo() {
      try {
        const password = yield this.ctx.helper.getPassword('');
      } catch(err) {
        this.ctx.body = err;
      }
    }
  }
  return BeController;
};
