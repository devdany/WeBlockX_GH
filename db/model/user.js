const connector = require('../Connector');
const Sequelize = require('sequelize');

const user = connector.define('USER', {
    no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    steemId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    post_key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    create_dt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    update_dt: {
        type: Sequelize.STRING,
        allowNull: true
    },
    delete_dt: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isDel: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    last_login: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = user;