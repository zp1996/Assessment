'use strict';

module.exports = opts => {          // eslint-disable-line
  return function* (next) {
    try {
      console.log(this.url);
      yield next;
    } catch (err) {
      this.body = this.helper.serverError(err);
    }
  };
};
