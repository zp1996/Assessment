'use strict';

const pwdRE = /^\w{6,18}$/;

module.exports = app => {
  class BeController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.model = this.ctx.model.Admin;
      this.helper = this.ctx.helper;
    }
    * login() {
      const { username, password, remember } = this.ctx.request.body;

      const body = this.helper.checkParams([
        { data: username, msg: '用户名格式错误！' },
        { data: password, msg: '密码格式错误！', re: pwdRE },
      ]);

      if (body) {
        this.ctx.body = body;
      } else {
        try {
          const res = yield this.model.login(username, password);
          if (typeof res === 'string') {
            this.ctx.body = this.helper.paramErr(res);
          } else {
            this.ctx.body = { msg: 'success' };
          }
        } catch(err) {
          this.ctx.body = this.helper.serverError(err);
        }
      }
    }
  }
  return BeController;
};
