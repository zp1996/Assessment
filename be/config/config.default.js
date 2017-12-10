'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1509629552850_8863';

  // add your config here
  config.middleware = [ 'url' ];

  config.mongoose = {
    url: 'mongodb://127.0.0.1/lsgopage',
    options: {}
  };

  // 暂不开启，后期完善
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
