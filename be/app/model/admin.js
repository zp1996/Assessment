'use strict';

const { preSave, paramErr } = require('./utils');
const { comparePassword } = require('../lib/bcrypt');

module.exports = app => {
  const { mongoose } = app;
  const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    status: {
      type: Number,
      default: 1
    },
    createTime: Date,
    updateTime: Date
  });

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
        } else {
          return '密码错误！';
        }
      } else {
        return '该用户不存在！';
      }
    },

    * add(username, password) {
      try {
        const res = yield this.create({
          username,
          password,
        });
      } catch(err) {
        console.log(err);
      }
    },
  };

  AdminSchema.pre('save', preSave);

  return mongoose.model('Admin', AdminSchema);
};
