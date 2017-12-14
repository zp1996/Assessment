'use strict';

module.exports = {
  /**
   * 500error
   * @param {any} err - 错误原因
   * @return {object} 响应对象
   */
  serverError(err) {
    this.app.logger.error(err);
    return {
      code: 500,
      msg: err.msg || '服务器发生未知错误！',
    };
  },
  /**
   * 400error
   * @param {string} msg - 参数错误描述
   * @return {object} 响应对象
   */
  paramErr(msg) {
    return { code: 400, msg };
  },
  /**
   * 200
   * @param {any} msg - 响应body
   * @return {object} 响应对象
   */
  success(msg) {
    return { code: 200, msg };
  },
  /**
   * 校验入参
   * @param {object} params - 参数数据加校验规则
   * @return {object|boolean} - 校验后结果
   */
  checkParams(params) {
    let res = null;
    params.every(p => {
      const flag = p.re ? p.re.test(p.data) : p.data !== '';
      if (!flag) {
        res = this.paramErr(p.msg);
      }
      return flag;
    });
    return res;
  },
};
