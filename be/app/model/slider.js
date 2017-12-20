'use strict';

const { preSave, dateSchema } = require('./utils');
const { SliderStruct, getSchema } = require('../lib/struct');
const keys = Object.keys(SliderStruct).join(' ');

module.exports = app => {
  const { mongoose } = app;
  const SliderSchema = new mongoose.Schema(
    Object.assign(
      getSchema(SliderStruct), dateSchema, {
        status: {
          type: Number,
          default: 1,
        },
      }
    )
  );

  SliderSchema.statics = {
    * add(data) {
      const res = yield this.create(data);
      return res._id;
    },
    * get() {
      const res = yield this.find({ status: 1 }).select(keys);
      return res;
    },
    * update({ data, id }) {
      yield this.findByIdAndUpdate(id, { $set: data });
    },
    * delete(id) {
      yield this.findByIdAndUpdate(id, { $set: { status: 0 } });
    },
  };

  SliderSchema.pre('save', preSave);

  return mongoose.model('Slider', SliderSchema);
};
