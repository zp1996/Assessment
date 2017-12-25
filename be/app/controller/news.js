'use strict';

const { NewsStruct, getFormatDate } = require('../lib/struct');
const response = require('../lib/response');
const keys = Object.keys(NewsStruct);

module.exports = app => {
  class NewsController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model.News;
      this.baseSave = response(this, NewsStruct, (p, key) => {
        if (key === 'content') {
          p.fn = d => d !== '<p><br></p>';
        }
        return p;
      });
    }
    * add() {
      yield this.baseSave('add', '添加成功');
    }
    * update() {
      yield this.baseSave('update', '更改成功', p => p.data);
    }
    * delete() {
      const { payload } = this.ctx.request.body;
      yield this.model.delete(payload.id);
      this.ctx.body = { code: 200, msg: '删除成功' };
    }
    * baseContent(keys, hd) {
      const { params: { id } } = this.ctx;
      if (id == null) {
        this.ctx.body = this.helper.paramErr('未传入参数');
      } else {
        const res = yield this.model.getContent(id, keys, hd);
        this.ctx.body = this.helper.success(res);
      }
    }
    * getContent() {
      yield this.baseContent(
        [ 'title', 'content', 'updateTime' ],
        { updateTime: d => getFormatDate(d) }
      );
    }
    * getArticle() {
      yield this.baseContent(keys);
    }
    * getNewsList() {
      const { params: { page = 1 } } = this.ctx;
      const res = yield this.model.getHandleNewsList(page - 1, 10);
      this.ctx.body = this.helper.success(res);
    }
  }
  return NewsController;
};
