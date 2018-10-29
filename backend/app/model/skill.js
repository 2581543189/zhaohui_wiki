'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const Skill = app.model.define('skill', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type:Sequelize.DATE,
      field:'_timestamp'
    },
    first: Sequelize.STRING(128),
    second: Sequelize.STRING(128),
    third: Sequelize.STRING(128),
  },{
    timestamps: false,
    freezeTableName: true,
  });
  //Skill.associate = function() {
    //Skill.hasMany(app.model.Article, { foreignKey: 'skill' });
    //Skill.belongsTo(app.model.Article, { foreignKey: 'id' })
  //}

  return Skill;
};
