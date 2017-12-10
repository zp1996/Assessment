module.exports = opts => {
  return function *(next) {
    console.log(this.url);
    yield next;
  }
};
