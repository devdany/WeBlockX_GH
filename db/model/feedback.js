const connector = require('../Connector');
const Sequelize = require('sequelize');

const feedback = connector.define('FEEDBACK', {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permlink: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complain_no:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_no: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payoutdate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    writedate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ex_sbd: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    ex_steem: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    ex_sp: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = feedback;