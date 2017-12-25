export const setError = {
  setError: (state, action) => {
    return {
      ...state,
      err: action.err,
    };
  },
};

export function setState(key) {
  return function (state, action) {
    return {
      ...state,
      ...{ [key]: action[key] },
    };
  };
}

export function deleteSuccess(key = '_id') {
  return (state, action) => {
    let { list } = state;
    const { id, msg } = action;
    list = list.filter(item => item[key] !== id);
    return {
      ...state,
      ...{ msg, list },
    };
  };
}

export function deleteEffects(del) {
  return {
    *delete({ id }, { put }) {
      const msg = yield del({ payload: { id } });
      yield put({
        type: 'deleteSuccess',
        msg,
        id,
      });
    },
  };
}
