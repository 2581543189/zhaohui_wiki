'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const Note = app.model.define('note', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type:Sequelize.DATE,
      field:'_timestamp'
    },
    bookId:{
      type:Sequelize.BIGINT(11),
      field:'book'
    },
    current:Sequelize.INTEGER(11),
    date:Sequelize.DATE,
    url:Sequelize.STRING(1024),
    
  },{
    timestamps: false,
    freezeTableName: true,
  });
  Note.associate = function() {
    Note.belongsTo(app.model.Book,{foreignKey:'bookId'})
  }

  return Note;
};
