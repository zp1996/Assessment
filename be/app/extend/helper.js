const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  /**
   * 500error
   */
  serverError() {
    return {
      code: 500,
      msg: '服务器发生未知错误！'
    };
  },
  /**
   * 校验密码并加密
   */
  getPassword(str) {
    return new Promise((resolve, reject) => {
      // 数据校验
      const re = /^\w{6,18}$/;
      if (str == null || !re.test(str)) {
        return reject({
          code: 400,
          msg: '密码格式错误！'
        });
      }
      bcrypt.hash(str, saltRounds, (err, hash) => {
        if (err != null) {
          this.app.logger.error(err);
          return reject(this.serverError());
        }
        resolve(hash);
      });
    });
  }
};
