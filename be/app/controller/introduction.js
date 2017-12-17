'use strict';

const { IntroductionStruct } = require('../lib/struct');

module.exports = app => {
  class IntroductionController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model.Introduction;
    }
    * baseSave(fn, msg, hd = v => v) {
      const { payload } = this.ctx.request.body;
      const params = [];
      const data = hd(payload);
      Object.keys(data).forEach(key => {
        if (key !== 'id') {
          params.push({
            data: data[key],
            msg: IntroductionStruct[key],
          });
        }
      });

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
      yield this.baseSave('update', '更改成功', p => p.data);
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
