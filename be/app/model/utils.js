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
