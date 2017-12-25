'use strict';

module.exports = (ctx, struct, createCheck = p => p) => {
  return function* baseSave(fn, msg, hd = v => v) {
    const { payload } = ctx.ctx.request.body;
    const params = [];
    const data = hd(payload);
    Object.keys(data).forEach(key => {
      if (key !== 'id') {
        const p = createCheck({
          data: data[key],
          msg: struct[key],
        }, key);
        params.push(p);
      }
    });

    const body = ctx.helper.checkParams(params);
    if (body) {
      ctx.ctx.body = body;
    } else {
      const id = yield this.model[fn](payload);
      const res = id ? { text: msg, id } : { text: msg };
      ctx.ctx.body = this.helper.success(res);
    }
  };
};
