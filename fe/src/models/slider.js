import { setup } from 'utils/redux-helper';
import { get, add, update, del } from 'services/slider';
import { setState, deleteSuccess, deleteEffects } from './base';

export default {

  namespace: 'slider',

  state: {
    list: [],
    msg: '',
  },

  effects: {
    *get({}, { put }) {     // eslint-disable-line
      const list = yield get();
      yield put({
        type: 'init',
        list,
      });
    },
    *add({ payload }, { put }) {
      const res = yield add({ payload });
      payload._id = res.id;
      yield put({
        type: 'addSuccess',
        msg: res.text,
        item: payload,
      });
    },
    *update({ payload }, { put }) {
      const id = payload._id;
      delete payload._id;
      const data = payload;
      const res = yield update({ payload: { id, data } });
      yield put({
        type: 'updateSuccess',
        msg: res.text,
        id,
        data,
      });
    },
    ...deleteEffects(del),
  },

  subscriptions: {
    setup: setup('/slider', ['get']),
  },

  reducers: {
    addSuccess: (state, action) => {
      const { list } = state;
      list.push(action.item);
      return {
        ...state,
        ...{ msg: action.msg, list },
      };
    },
    updateSuccess: (state, action) => {
      const { list } = state;
      const { id, data, msg } = action;
      for (let i = 0, item; item = list[i++]; ) {   // eslint-disable-line
        if (item._id === id) {
          Object.keys(data).forEach((key) => {
            item[key] = data[key];
          });
          break;
        }
      }
      return {
        ...state,
        ...{ msg, list },
      };
    },
    deleteSuccess: deleteSuccess(),
    init: setState('list'),
  },

};
