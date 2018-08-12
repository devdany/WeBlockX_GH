const Sequelize = require('sequelize');
const dbconfig = require('../config');
const Op = Sequelize.Op

const sequelize = new Sequelize(
    dbconfig.db.dbschema,
    dbconfig.db.username,
    dbconfig.db.password,
    {
        'host': dbconfig.db.host,
        'dialect': dbconfig.db.dialect,
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like
        },
        logging: false
    }
)

module.exports = sequelize;