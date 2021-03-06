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
      password: "123456",
      database: "test",
      host: "47.99.76.20",
      port:3306,
      dialect: "mysql",
      timezone:'+08:00'
  };
  config.security= {
    csrf: {
      ignore:ctx => {return true},
    },
  }

  return config;
};
