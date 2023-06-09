require("dotenv").config();

const { Sequelize, DataTypes  } = require("sequelize");

const sequelize = new Sequelize(process.env.NAME_MYSQL, process.env.USER_MYSQL, process.env.PASSWORD_MYSQL, {
  host: process.env.HOST_MYSQL,
  dialect: "mysql",
  operatorsAliases: 0,
  logging: false,
  port: process.env.PORT_MYSQL,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    connectTimeout: 20000,
  },
  dialectOptions: {
    // useUTC: false,
    timezone: "+07:00",
    dateStrings: true,
    typeCast: function (field, next) {
      // for reading from database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "+07:00",
});
const dbMysql = {};

dbMysql.Sequelize = Sequelize;
dbMysql.sequelize = sequelize;
dbMysql.name = process.env.NAME_MYSQL;

dbMysql.auth_user = require("./mysql/auth_user")(sequelize, Sequelize, DataTypes);
dbMysql.gift = require("./mysql/gift")(sequelize, Sequelize, DataTypes);
dbMysql.room = require("./mysql/room")(sequelize, Sequelize, DataTypes);
dbMysql.user = require("./mysql/user")(sequelize, Sequelize, DataTypes);

module.exports = dbMysql;
