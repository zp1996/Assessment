'use strict';

const newsLimit = 6;

module.exports = app => {
  class HomeController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model;
    }
    * index() {
      // 获取news数据
      const news = yield this.model.News.getPageList(0, newsLimit);
      // 获取slider数据
      let slider = yield this.model.Slider.get();
      slider = slider.map(item => {
        const r = {
          id: item._id,
          url: item.url,
          title: item.title,
        };
        if (item.type === 'btn') {
          r.btn = { url: item.stitle };
        } else {
          r.stitle = item.stitle;
        }
        r.type = item.style.join('.');
        item = null;
        return r;
      });

      this.ctx.body = this.helper.success({ slider, news });
    }
    * news() {
      const { params: { page = 1 } } = this.ctx;
      const news = yield this.model.News.getPageList(page - 1, newsLimit);
      this.ctx.body = this.helper.success({ news });
    }
  }
  return HomeController;
};
