
const bcrypt = require("bcryptjs");

async function dbAccess(db) {
  try {
    await db.sequelize.authenticate().then(function (err) {
      if (!err) {
        db.sequelize.sync({ force: true }).then(async() => {
          console.log(db.name + " Main Database already connected!");
          const hashedPassword = await bcrypt.hash("1", 10);
          var data = {
            auth_user_id : 'admin',
            email : 'admin@admin.com',
            name : "Admin",
            password : hashedPassword,
            created_by : "admin"
          }
          await db.auth_user.create(data);
        });
      }
    });
  } catch (error) {
    console.error("Unable to connect to the database: " + db.name, error);
  }
}

module.exports = async function (app) {
  try {
    const dbMysql = require("./mysql");
    console.log(dbMysql.name);
    await dbAccess(dbMysql);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
