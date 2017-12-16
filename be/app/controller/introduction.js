'use strict';

const { IntroductionStruct } = require('../lib/struct');

module.exports = app => {
  class IntroductionController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model.Introduction;
    }
    * baseSave(fn, msg) {
      const { payload } = this.ctx.request.body;

      const params = Object.keys(payload).map(key => ({
        data: payload[key],
        msg: IntroductionStruct[key],
      }));

      const body = this.helper.checkParams(params);
      if (body) {
        this.ctx.body = body;
      } else {
        yield this.model[fn](payload);
        this.ctx.body = this.helper.success(msg);
      }
    }
    * add() {
      yield this.baseSave('add', '添加成功');
    }
    * update() {
      yield this.baseSave('update', '更改成功');
    }
    * get(ctx, keys = Object.keys(IntroductionStruct)) {
      const res = yield this.model.findOne({}, keys);
      this.ctx.body = this.helper.success(res);
    }
    * getCompany(ctx) {
      yield this.get(ctx, [ 'name', 'enName', 'introduction' ]);
    }
    * getConcat(ctx) {
      yield this.get(ctx, [ 'address', 'email', 'phone', 'zip', 'fax' ]);
    }
  }
  return IntroductionController;
};
