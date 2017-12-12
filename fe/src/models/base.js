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
