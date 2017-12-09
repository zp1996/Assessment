/**
 * 密码校验,a-zA-z0-9_,6到18位
 */
export const pwdRE = /^\w{6,18}$/i;

/**
 * react改变state公共方法
 * @param {object} ctx - 上下文
 * @param {string | array} key - state键名
 * @param {function | object} fn - 值处理函数
 */
export function changeState(ctx, key, fn = {}) {
  return (value) => {
    const keys = Array.isArray(key) ? key : [key];
    const fns = typeof fn === 'function' ? { [key]: fn } : fn;
    const state = {};
    keys.forEach((k) => {
      state[k] = fns[k] ? fns[k](value) : value;
    });
    ctx.setState(state);
  };
}
/**
 * dom改变state
 */
export const domChange = e => e.target.value;
