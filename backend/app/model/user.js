'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type:Sequelize.DATE,
      field:'_timestamp'
    },
    name: Sequelize.STRING(128),
    password: Sequelize.STRING(128),
    role: Sequelize.INTEGER,
    avatar:Sequelize.STRING(1024),
  },{
    timestamps: false,
    freezeTableName: true,
  });

  return User;
};
