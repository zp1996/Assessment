'use strict';

const { preSave, dateSchema } = require('./utils');
const { IntroductionStruct, getSchema } = require('../lib/struct');

module.exports = app => {
  const { mongoose } = app;
  const IntroductionSchema = new mongoose.Schema(
    Object.assign(
      getSchema(IntroductionStruct, String), dateSchema
    )
  );

  IntroductionSchema.statics = {
    * add(data) {
      const row = yield this.find({});
      if (row.length === 0) {
        yield this.create(data);
      } else {
        const error = new Error();
        error.msg = '已存在该类型数据，不可再次创建';
        throw error;
      }
    },
  };

  IntroductionSchema.pre('save', preSave);

  return mongoose.model('Introduction', IntroductionSchema);
};
