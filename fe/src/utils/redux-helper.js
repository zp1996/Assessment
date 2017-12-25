import { parse } from 'query-string';

export function setup(path, types) {
  return ({ dispatch, history }) => {
    history.listen(({ pathname }) => {
      if (pathname === path) {
        types.forEach((type) => {
          dispatch({ type });
        });
      }
    });
  };
}

export function setupWtihQuery(path, data) {
  return ({ dispatch, history }) => {
    history.listen(({ pathname, search }) => {
      if (pathname === path) {
        const query = parse(search);
        data.forEach((item) => {
          const payload = query[item.key];
          if (payload) {
            dispatch({ type: item.type, payload });
          }
        });
      }
    });
  };
}
