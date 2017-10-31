import { select } from 'redux-saga/effects';

export default {

  namespace: 'example',

  state: {
    name: 'zp1996'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { example: { name = '' } } = yield select();
      if (name === payload) {
        return void 0;
      }
      yield put({
        type: 'save',
        payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
