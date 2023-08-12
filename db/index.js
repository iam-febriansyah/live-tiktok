const bcrypt = require("bcryptjs");
const help = require("../helpers/general");

async function dbAccess(db) {
  try {
    await db.sequelize.authenticate().then(function (err) {
      if (!err) {
        var force = false;
        db.sequelize.sync({ force: force }).then(async () => {
          console.log(db.name + " Main Database already connected!");
          if (force) {
            const hashedPassword = await bcrypt.hash("1", 10);
            var dataAuth = {
              auth_user_id: "admin",
              email: "admin@admin.com",
              name: "Admin",
              password: hashedPassword,
              created_by: "admin",
            };
            await db.auth_user.create(dataAuth);

            var dataUser = {
              user_id: "admin",
              domain: "admin.com",
              email: "admin@admin.com",
              license: "admin",
              created_by: "admin",
              expire_date: "2030-01-01",
            };
            await db.user.create(dataUser);
          }
          var now = help.dateTimeNow();
          await db.room.update({ end_live_date: now, end_reason: "Restart Server" });
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
