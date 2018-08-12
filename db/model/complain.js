const connector = require('../Connector');
const Sequelize = require('sequelize');

const complain = connector.define('COMPLAIN', {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permlink: {
        type: Sequelize.STRING,
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
    category: {
        type: Sequelize.STRING,
        allowNull: true
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
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = complain;