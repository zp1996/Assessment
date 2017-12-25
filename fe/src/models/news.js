import { setup, setupWtihQuery } from 'utils/redux-helper';
import { addNewData } from 'utils/config';
import { get, add, update, del, getArticle } from 'services/news';
import { setState, deleteSuccess, deleteEffects } from './base';

const createArticle = () => ({
  _id: null,
  data: addNewData(),
});

export default {
  namespace: 'news',

  state: {
    list: [],
    msg: '',
    article: createArticle(),
  },

  effects: {
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
      const res = yield update({ payload });
      yield put({
        type: 'updateSuccess',
        data: payload.data,
        msg: res.text,
      });
    },
    *get({}, { put }) {       // eslint-disable-line
      const list = yield get();
      yield put({
        type: 'init',
        list,
      });
    },
    *getArticle({ payload }, { put }) {
      const res = yield getArticle(payload);
      yield put({
        type: 'initArticle',
        article: res,
      });
    },
    ...deleteEffects(del),
  },

  subscriptions: {
    requestList: setup('/new', ['get']),
    requestArticle: setupWtihQuery('/addnew', [
      { type: 'getArticle', key: 'id' },
    ]),
  },

  reducers: {
    addSuccess: (state, action) => {
      const { list } = state;
      list.unshift(action.item);
      return {
        ...state,
        ...{ msg: action.msg, list },
      };
    },
    updateSuccess: (state, action) => {
      const { article } = state;
      const { data, msg } = action;
      Object.keys(data).forEach((key) => {
        article[key] = data[key];
      });
      return {
        list: state.list,
        article,
        msg,
      };
    },
    initArticle: (state, action) => {
      const { _id } = action.article;
      delete action.article._id;
      return {
        ...state,
        ...{ article: { _id, data: action.article } },
      };
    },
    deleteSuccess: deleteSuccess('key'),
    init: setState('list'),
    resetMsg: setState('msg'),
    resetArticle: (state) => {
      return {
        ...state,
        ...{ article: createArticle() },
      };
    },
  },

};
