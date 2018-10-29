'use strict';

module.exports = app => {
    const Sequelize = app.Sequelize;

    const Bulletin = app.model.define('bulletin', {
        id: {
            type: Sequelize.BIGINT(11),
            primaryKey: true,
            autoIncrement: true,
        },
        timestamp: {
            type:Sequelize.DATE,
            field:'_timestamp'
        },
        startDate: {
            type:Sequelize.DATE,
            field:'start_date'
        },
        endDate: {
            type:Sequelize.DATE,
            field:'end_date'
        },
        level: Sequelize.BIGINT(11),
        sketch: Sequelize.STRING(1024),
        startUrl: {
            type:Sequelize.STRING(1024),
            field:'start_url'
        },
        endUrl: {
            type:Sequelize.STRING(1024),
            field:'end_url'
        }
    },{
        timestamps: false,
        freezeTableName: true,
    });
    return Bulletin;

}