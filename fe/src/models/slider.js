import { setup } from 'utils/redux-helper';
import { get } from 'services/slider';

export default {

  namespace: 'slider',

  state: {
    list: [
      {
        url: 'http://www.yijiahe.com.cn/temp/slider_index_02.jpg',
        title: '诚信 . 创新 . 专注 . 极致',
        stitle: '应用智能科技，改善人类生活',
        style: ['center', 'big'],
      },
    ],
    err: null,
  },

  effects: {
    *get({}, { put }) {     // eslint-disable-line
      const data = yield get();
      console.log(data);
      // yield put({
      //   type: 'set',
      //   payload: data,
      // });
    },
  },

  subscriptions: {
    setup: setup('/slider', ['slider/get']),
  },

  reducers: {
    set(state, action) {
      const { payload: { code, msg, list = null } } = action;
      const err = code && msg ? { code, msg } : null;
      return {
        ...state,
        err,
        list,
      };
    },
  },

};
