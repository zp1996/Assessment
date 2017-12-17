/**
 * dva plugin, for handle error
 */

const ERROR = '@@DVA_ERROR/ERROR';
const RESET = '@@DVA_ERROR/RESET';

export default function createError(namespace = 'error') {
  const initalState = {
    err: false,
    code: null,
    msg: '',
  };

  const extraReducers = {
    [namespace](state = initalState, { type, error }) {
      try {
        error = error ? JSON.parse(error) : error;      // eslint-disable-line
        switch (type) {
          case ERROR:
            error.err = true;
            return error;
          case RESET:
            return initalState;
          default:
            return state;
        }
      } catch(err) {            // eslint-disable-line
        // 后期上报err
        return {
          err: true,
          code: 400,
          msg: '应用内部异常，请稍后再试',
        };
      }
    },
  };

  function onEffect(effect, { put }) {
    return function *(...args) {
      yield put({ type: RESET });
      try {
        yield effect(...args);
      } catch (err) {
        const { message: msg } = err;
        const start = msg.indexOf('{');
        const end = msg.lastIndexOf('}');
        const json = msg.slice(start, end + 1);
        yield put({
          type: ERROR,
          error: json,
        });
      }
    };
  }

  return { extraReducers, onEffect };
}
