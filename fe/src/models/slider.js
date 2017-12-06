import { setup } from 'utils/redux-helper';
import { get } from 'services/slider';

export default {

  namespace: 'slider',

  state: {
    list: null,
    err: null,
  },

  effects: {
    *get({}, { put }) {     // eslint-disable-line
      const data = yield get();
      yield put({
        type: 'set',
        payload: data,
      });
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
