'use strict';

/**
 * 保存前添加更新时间
 * @param {object} next - 默认参数
 */
exports.preSave = function(next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now();
  } else {
    this.updateTime = Date.now();
  }
  next();
};

exports.dateSchema = {
  createTime: Date,
  updateTime: Date,
};

/**
 * 创建错误对象
 * @param {string} msg - 错误信息
 * @return {object} 错误对象
 */
exports.createError = function(msg) {
  const error = new Error();
  error.msg = msg;
  error.code = 400;
  return error;
};
