'use strict';

const { SliderStruct } = require('../lib/struct');
const response = require('../lib/response');

module.exports = app => {
  class SliderController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model.Slider;
      this.baseSave = response(this, SliderStruct, (p, key) => {
        if (key === 'style') {
          p.fn = d => Array.isArray(d) && d.length;
        }
        return p;
      });
    }
    * get() {
      const list = yield this.model.get();
      this.ctx.body = {
        code: 200,
        msg: list,
      };
    }
    * add() {
      yield this.baseSave('add', '添加成功');
    }
    * update() {
      yield this.baseSave('update', '更新成功', p => p.data);
    }
    * delete() {
      const { payload } = this.ctx.request.body;
      yield this.model.delete(payload.id);
      this.ctx.body = { code: 200, msg: '删除成功' };
    }
  }
  return SliderController;
};
