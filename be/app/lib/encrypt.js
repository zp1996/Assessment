'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  /**
   * 校验密码并加密
   * @param {string} str - 待加密密码
   * @return {promise} 加密后结果
   */
  encryptStr(str) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(str, saltRounds, (err, hash) => {
        if (err != null) {
          return reject('error');
        }
        resolve(hash);
      });
    });
  },
  /**
   * 比对密码
   * @param {string} password - 未加密密码
   * @param {string} hash - 已加密后的密码
   * @return {promise} 比对后结果
   */
  comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err != null) {
          return reject('error');
        }
        resolve(res);
      });
    });
  },
  /**
   * 进行md5加密
   * @param {string} str - 待加密字符串
   * @return {string} 加密后结果
   */
  encryptByMd5(str) {
    const date = Number(new Date());
    return crypto.createHash('md5').update(`${str}${date}`).digest('hex');
  },
};
