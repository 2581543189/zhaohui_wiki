'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const Book = app.model.define('book', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type:Sequelize.DATE,
      field:'_timestamp'
    },
    name: Sequelize.STRING(1024),
    author: Sequelize.STRING(1024),
    skillId:{
        type:Sequelize.BIGINT(11),
        field:'skill'
    },
    count:Sequelize.INTEGER(11),
    current:Sequelize.INTEGER(11),
    startDate: {
        type:Sequelize.DATE,
        field:'start_date'
    },
    endDate: {
        type:Sequelize.DATE,
        field:'end_date'
    },
    score:Sequelize.DECIMAL(3,1),
    img:Sequelize.STRING(1024),
    
  },{
    timestamps: false,
    freezeTableName: true,
  });
  Book.associate = function() {
    //Article.hasOne(app.model.Skill,{ foreignKey: 'skill' });
    Book.belongsTo(app.model.Skill,{foreignKey:'skillId'})
  }

  return Book;
};
