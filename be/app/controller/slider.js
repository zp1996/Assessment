'use strict';

const { SliderStruct } = require('../lib/struct');

module.exports = app => {
  class SliderController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model.Slider;
    }
    * get() {
      const list = yield this.model.get();
      this.ctx.body = {
        code: 200,
        msg: list,
      };
    }
    * baseSave(fn, msg, hd = v => v) {
      const { payload } = this.ctx.request.body;
      const params = [];
      const data = hd(payload);
      Object.keys(data).forEach(key => {
        if (key !== 'id') {
          const p = {
            data: data[key],
            msg: SliderStruct[key].text || SliderStruct[key],
          };
          if (key === 'style') {
            p.fn = d => Array.isArray(d) && d.length;
          }
          params.push(p);
        }
      });

      const body = this.helper.checkParams(params);
      if (body) {
        this.ctx.body = body;
      } else {
        const id = yield this.model[fn](payload);
        this.ctx.body = this.helper.success({
          text: msg,
          id,
        });
      }
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
