'use strict';

const { preSave, dateSchema } = require('./utils');
const { comparePassword } = require('../lib/bcrypt');

module.exports = app => {
  const { mongoose } = app;
  const AdminSchema = new mongoose.Schema(
    Object.assign({
      username: String,
      password: String,
      status: {
        type: Number,
        default: 1,
      },
    }, dateSchema)
  );

  AdminSchema.statics = {
    * login(username, password) {
      const row = yield this.findOne({
        username,
        status: 1,
      }, 'password');
      if (row != null) {
        const flag = yield comparePassword(password, row.password);
        if (flag) {
          return true;
        }
        return '密码错误！';

      }
      return '该用户不存在！';

    },

    * add(username, password) {
      try {
        const res = yield this.create({
          username,
          password,
        });
        return res;
      } catch (err) {
        console.log(err);
      }
    },
  };

  AdminSchema.pre('save', preSave);

  return mongoose.model('Admin', AdminSchema);
};
