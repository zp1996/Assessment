import { setup } from 'utils/redux-helper';
import { get, add, update, del } from 'services/menu';
import { setState, deleteSuccess, updateSuccess, deleteEffects } from './base';

export default {
  namespace: 'menu',

  state: {
    list: [],
    msg: '',
  },

  effects: {
    *get({}, { put }) {      // eslint-disable-line
      const list = yield get();
      yield put({
        type: 'init',
        list,
      });
    },
    *add({ payload }, { put }) {
      const { id, text } = yield add({ payload });
      yield put({
        type: 'addSuccess',
        data: payload,
        id,
        msg: text,
      });
    },
    *update({ payload }, { put }) {
      const { text } = yield update({ payload });
      yield put({
        type: 'updateSuccess',
        data: payload.data,
        msg: text,
        id: payload.id,
      });
    },
    ...deleteEffects(del),
  },

  subscriptions: {
    setup: setup('/', ['get']),
  },

  reducers: {
    addSuccess: (state, action) => {
      const { list } = state;
      const { msg, id } = action;
      const data = Object.assign(action.data, id);
      list.push(data);

      return {
        ...state,
        ...{ msg, list },
      };
    },
    init: setState('list'),
    resetMsg: setState('msg'),
    updateSuccess: updateSuccess('id'),
    deleteSuccess: deleteSuccess('id'),
  },
};
