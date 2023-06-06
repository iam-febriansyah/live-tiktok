const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
  host: process.env.HOST_DB,
  logging: false,
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    connectTimeout: 20000,
  },
  storage: "./db/database.sqlite",
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.name = process.env.NAME_DB;

db.chats = require("./tables/chats")(sequelize, Sequelize, DataTypes);
db.gifts = require("./tables/gifts")(sequelize, Sequelize, DataTypes);
db.gift_extras = require("./tables/gift_extras")(sequelize, Sequelize, DataTypes);

db.gifts.hasOne(db.gift_extras, { foreignKey: "gift_id_key", sourceKey: "gift_id_key" });

module.exports = db;
