import { setup } from 'utils/redux-helper';
import { data } from 'utils/config';
import { add, get } from 'services/introduction';
import { setError, setState } from './base';

export default {

  namespace: 'introduction',

  state: {
    err: null,
    success: false,
    data,
  },

  effects: {
    *add({ payload }, { put }) {
      delete payload.change;
      delete payload.err;

      try {
        yield add({ payload });
        yield put({
          type: 'success',
          success: true,
        });
      } catch (err) {
        yield put({
          type: 'setError',
          err,
        });
      }
    },
    *get({}, { put }) {           // eslint-disable-line
      try {
        const res = yield get();
        if (res != null) {
          delete res._id;         // eslint-disable-line
          yield put({
            type: 'init',
            data: res,
          });
        }
      } catch (err) {
        yield put({
          type: 'setError',
          err,
        });
      }
    },
  },

  subscriptions: {
    setup: setup('/introduction', ['get']),
  },

  reducers: {
    ...setError,
    success: setState('success'),
    init: (state, action) => {
      return {
        ...state,
        ...{ data: action.data },
      };
    },
  },

};
