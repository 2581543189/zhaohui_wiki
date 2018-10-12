'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_sequelize-example';

  // config.sequelize = {
  //   username: "tcdsfservstatV2",
  //   password: "2jgUbyM12moU486n3BSBcOEE",
  //   database: "test",
  //   host: "10.100.41.207",
  //   port:3425,
  //   dialect: "mysql"
  // };
    config.sequelize = {
      username: "root",
      password: "ioenINL.031527",
      database: "test",
      host: "127.0.0.1",
      port:3306,
      dialect: "mysql"
  };
  config.security= {
    csrf: {
      ignore:ctx => {return true},
    },
  }

  return config;
};
