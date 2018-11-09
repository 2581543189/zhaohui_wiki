'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const Article = app.model.define('article', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type:Sequelize.DATE,
      field:'_timestamp'
    },
    title: Sequelize.STRING(1024),
    createDate:{
      type:Sequelize.DATE,
      field:'create_date'
    } ,
    platform: Sequelize.STRING(128),
    skillId:{
      type:Sequelize.BIGINT(11),
      field:'skill'
    },
    url:Sequelize.STRING(1024),
  },{
    timestamps: false,
    freezeTableName: true,
  });
  Article.associate = function() {
    //Article.hasOne(app.model.Skill,{ foreignKey: 'skill' });
    Article.belongsTo(app.model.Skill,{foreignKey:'skillId'})
  }

  return Article;
};
