'use strict';

const { dateSchema, preSave, createError } = require('./utils');
const { MenuStruct, getSchema, getFormatDate } = require('../lib/struct');

module.exports = app => {
  const { mongoose } = app;
  const MenuSchema = new mongoose.Schema(
    Object.assign(
      getSchema(MenuStruct), dateSchema, {
        status: {
          type: Number,
          default: 1,
        },
      }
    )
  );

  MenuSchema.statics = {
    * add(data) {
      // 不允许存在两个相同的文字的导航
      const row = yield this.findOne({ title: data.title, status: 1 });
      if (row == null) {
        const res = yield this.create(data);
        return { id: res._id, updateTime: getFormatDate(res.updateTime) };
      }
      throw createError('在该导航已存在，不可重复创建');
    },
    * update({ id, data }) {
      yield this.findByIdAndUpdate(id, { $set: data });
    },
    * get(fields) {
      const res = yield this.find({ status: 1 })
        .select(fields.join(' '));
      return res;
    },
    * delete(id) {
      yield this.findByIdAndUpdate(id, { $set: { status: 0 } });
    },
    * getList() {
      const res = yield this.get([ 'title', 'href', 'updateTime' ]);
      return res.map(item => ({
        id: item._id,
        title: item.title,
        href: item.href,
        updateTime: getFormatDate(item.updateTime),
      }));
    },
  };
  MenuSchema.pre('save', preSave);

  return mongoose.model('Menu', MenuSchema);
};
