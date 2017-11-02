import { base } from 'utils/reducer';

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
    err: null
  },

  effects: {
    *submit() {

    },
  },

  reducers: {
    save: base
  },

};
