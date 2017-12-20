'use strict';

const fs = require('fs');
const path = require('path');
const { encryptByMd5 } = require('../lib/encrypt');

const writeStream = (stream, filename) => {
  return new Promise((resolve, reject) => {
    const bufs = [];
    let len = 0;
    stream.on('data', chunk => {
      bufs.push(chunk);
      len += chunk.length;
    });

    stream.on('end', err => {
      if (err) reject(err);

      fs.writeFile(path.resolve(`./app/public/${filename}`), Buffer.concat(bufs, len), err => {
        if (err) reject(err);
        resolve();
      });

    });

  });
};

module.exports = app => {
  class UploadController extends app.Controller {
    * index() {
      const stream = yield this.ctx.getFileStream();
      // 生成url
      let { filename } = stream;
      const index = filename.lastIndexOf('.');
      const ext = filename.slice(index + 1);
      const name = encryptByMd5(filename.slice(0, index));
      filename = `${name}.${ext}`;
      try {
        yield writeStream(stream, filename);
        this.ctx.body = {
          code: 200,
          msg: {
            url: `/api/public/${filename}`,
          },
        };
      } catch (err) {
        throw err;
      }
    }
  }
  return UploadController;
};
