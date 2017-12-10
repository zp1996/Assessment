const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  /**
   * 校验密码并加密
   */
  getPassword(str) {
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
};
