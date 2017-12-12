export function base(state, action) {
  return {
    ...state,
    ...action.payload,
  };
}

export function setup(path, types) {
  return ({ dispatch, history }) => {
    history.listen(({ pathname, query }) => {   // eslint-disable-line
      if (pathname === path) {
        types.forEach((type) => {
          dispatch({ type });
        });
      }
    });
  };
}
