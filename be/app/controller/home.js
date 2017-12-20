'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    constructor(ctx) {
      super(ctx);
      this.helper = this.ctx.helper;
      this.model = this.ctx.model;
    }
    * index() {
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

      this.ctx.body = {
        code: 200,
        msg: { slider },
      };
    }
  }
  return HomeController;
};
