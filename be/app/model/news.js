'use strict';

const { preSave, dateSchema, createError } = require('./utils');
const { NewsStruct, getSchema, getFormatDate } = require('../lib/struct');
const maxLimit = 10; // 默认最高记录为10条
const RE = /[\n\t]<p><br><\/p>/g;

module.exports = app => {
  const { mongoose } = app;
  const NewsSchema = new mongoose.Schema(
    Object.assign(
      getSchema(NewsStruct), dateSchema, {
        status: {
          type: Number,
          default: 1,
        },
      }
    )
  );

  NewsSchema.statics = {
    * add(data) {
      // 不允许相同题目新闻出现
      const row = yield this.findOne({ title: data.title, status: 1 });
      if (row == null) {
        data.content = data.content.replace(RE, '');
        const res = yield this.create(data);
        return res._id;
      }
      throw createError('该新闻题目已经存在，不可再次创建');
    },
    * update({ id, data }) {
      if (data.content) {
        data.content = data.content.replace(RE, '');
      }
      yield this.findByIdAndUpdate(id, { $set: data });
    },
    * getContent(id, keys, hd = {}) {
      keys.push('_id');
      try {
        const res = yield this.findOne({ _id: id, status: 1 })
          .select(keys.join(' '));

        return keys.reduce((data, key) => {
          const d = res[key];
          return Object.assign(data, {
            [key]: hd[key] ? hd[key](d) : d,
          });
        }, {});
      } catch (err) {
        console.log(err);
        throw createError('非法请求参数');
      }
    },
    * getNewsList(fields, page = 0, limit = maxLimit) {
      const res = yield this.find({ status: 1 })
        .skip(limit * page)
        .limit(limit)
        .select(fields.join(' '))
        .sort({ updateTime: 'desc' });
      return res;
    },
    * getHandleNewsList(page, limit) {
      const res = yield this.getNewsList([ 'title', 'updateTime' ], page, limit);
      return res.map(item => ({
        title: item.title,
        key: item._id,
        updateTime: getFormatDate(item.updateTime),
      }));
    },
    * getPageList(page, limit) {
      const res = yield this.getNewsList([ 'title', 'des', 'img' ], page, limit);
      return res;
    },
    * delete(id) {
      yield this.findByIdAndUpdate(id, { $set: { status: 0 } });
    },
  };
  NewsSchema.pre('save', preSave);

  return mongoose.model('News', NewsSchema);
};
