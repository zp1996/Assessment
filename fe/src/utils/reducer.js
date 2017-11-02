export function base(state, action) {
  return {
    ...state,
    ...action.payload
  };
};
