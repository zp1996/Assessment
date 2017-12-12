import { base } from 'utils/redux-helper';
import { login } from 'services/login';
import { setError } from './base';

export default {

  namespace: 'login',

  /**
   * err类型
   * 服务端错误{ code: 500, msg: xx }
   * 客户端错误{ code: 400, key: { xx: true } }
   */
  state: {
    err: null,
    login: false,
  },

  subscriptions: {

  },

  effects: {
    *submit({ payload }, { put }) {
      try {
        const res = yield login(payload);
        console.log(res);
      } catch (err) {
        yield put({
          type: 'setError',
          err,
        });
      }
    },
  },

  reducers: {
    save: base,
    ...setError,
  },

};
