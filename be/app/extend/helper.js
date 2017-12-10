const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  /**
   * 500error
   */
  serverError(err) {
    this.app.logger.error(err);
    return {
      code: 500,
      msg: '服务器发生未知错误！'
    };
  },
  /**
   * 400error
   */
  paramErr(msg) {
    return { code: 400, msg };
  },
  /**
   * 校验入参
   */
  checkParams(params) {
    let res = null;
    params.every(p => {
      const flag = p.re ? p.re.test(p.data) : p.data !== '';
      if (!flag) {
        res = this.paramErr(p.msg);
      }
    });
    return res;
  },
};
