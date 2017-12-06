import { base } from 'utils/redux-helper';

export default {

  namespace: 'login',

  /**
   * err类型
   * 服务端错误{ code: 500, msg: xx }
   * 客户端错误{ code: 400, key: { xx: true } }
   */
  state: {
    username: '',
    password: '',
    remember: true,
    err: null,
  },

  effects: {
    *submit() {
      console.log('submit');
    },
  },

  reducers: {
    save: base,
  },

};
