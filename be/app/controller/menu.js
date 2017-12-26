'use strict';

const { MenuStruct } = require('../lib/struct');
const response = require('../lib/response');

module.exports = app => {
  class MenuController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model.Menu;
      this.baseSave = response(this, MenuStruct);
    }
    * add() {
      yield this.baseSave('add', '添加成功');
    }
    * update() {
      yield this.baseSave('update', '更新成功', p => p.data);
    }
    * getList() {
      const res = yield this.model.getList();
      this.ctx.body = this.helper.success(res);
    }
    * delete() {
      const { payload } = this.ctx.request.body;
      yield this.model.delete(payload.id);
      this.ctx.body = { code: 200, msg: '删除成功' };
    }
  }
  return MenuController;
};
