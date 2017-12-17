import { setup } from 'utils/redux-helper';
import { data } from 'utils/config';
import { add, get, update } from 'services/introduction';
import { setState } from './base';

export default {

  namespace: 'introduction',

  state: {
    err: null,
    id: null,
    success: false,
    data,
  },

  effects: {
    *add({ payload }, { put }) {
      delete payload.change;
      delete payload.err;

      yield add({ payload });
      yield put({
        type: 'addSuccess',
        success: true,
      });
    },
    *update({ payload }, { put, select }) {
      delete payload.change;
      delete payload.err;

      let flag = false;
      const { introduction: i } = yield select();
      const nd = {};
      Object.keys(payload).forEach((key) => {
        const d = payload[key];
        if (d !== i.data[key]) {
          nd[key] = d;
          flag = true;
        }
      });

      if (flag) {
        yield update({
          payload: { data: nd, id: i.id },
        });
      }
      yield put({
        type: 'updateSuccess',
        data: nd,
        success: true,
      });
    },
    *get({}, { put }) {           // eslint-disable-line
      const res = yield get();
      const id = res._id;       // eslint-disable-line
      delete res._id;           // eslint-disable-line
      if (res != null) {
        yield put({
          type: 'init',
          data: res,
          id,
        });
      }
    },
  },

  subscriptions: {
    setup: setup('/introduction', ['get']),
  },

  reducers: {
    addSuccess: setState('success'),
    updateSuccess: (state, action) => {
      const nd = { ...state.data, ...action.data };
      return {
        ...state,
        success: true,
        data: nd,
      };
    },
    init: (state, action) => {
      return {
        ...state,
        ...{ data: action.data, id: action.id },
      };
    },
  },

};
