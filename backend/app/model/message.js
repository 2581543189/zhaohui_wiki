'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const Message = app.model.define('message', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type:Sequelize.DATE,
      field:'_timestamp',
    },
    name: Sequelize.STRING(128),
    avatar:Sequelize.STRING(1024),
    content:Sequelize.STRING(1024),
  },{
    timestamps: false,
    freezeTableName: true,
  });

  return Message;
};
