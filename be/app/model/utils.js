'use strict';

/**
 * 保存前添加更新时间
 */
exports.preSave = function(next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now();
  } else {
    this.updateTime = Date.now();
  }
  next();
};
