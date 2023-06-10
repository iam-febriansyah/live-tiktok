const dotenv = require("dotenv");
dotenv.config();

/**Database */
const dbMysql = require("../../db/mysql");
const Op = dbMysql.Sequelize.Op;

const help = require("../../helpers/general");

module.exports = {
  access: async (req, res) => {
    console.log("POST ACCESS USER");
    try {
      var { license } = req.body;
      if (typeof license == "undefined" || license == "") {
        throw "Please enter license";
      }
      var data = await dbMysql.user.findOne({ where: { license: license, is_deleted: { [Op.eq]: null } } });
      if (data) {
        var expire_date = data.expire_date;
        var now = new Date();
        var nowInt = parseInt(`${now.getFullYear()}${now.getMonth()}${now.getDay()}`);
        var expDate = new Date(expire_date);
        var expInt = parseInt(`${expDate.getFullYear()}${expDate.getMonth()}${expDate.getDay()}`);
        if (nowInt > expInt) {
          throw new Error("Masa aktif License sudah berakhir di tanggal " + expire_date);
        }
      } else {
        throw new Error("Akun tidak ditemukan");
      }
      res.send({ status: true, remarks: "License found!", data: data });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },

  setUsername: async (req, res) => {
    console.log("POST ACCESS USER");
    try {
      var { license, username } = req.body;
      if (typeof license == "undefined" || license == "") {
        throw "Please enter license";
      }
      if (typeof username == "undefined" || username == "") {
        throw "Please enter username";
      }
      var data = await dbMysql.user.findOne({ where: { license: license, is_deleted: { [Op.eq]: null } } });
      if (data) {
        var expire_date = data.expire_date;
        var now = new Date();
        var nowInt = parseInt(`${now.getFullYear()}${now.getMonth()}${now.getDay()}`);
        var expDate = new Date(expire_date);
        var expInt = parseInt(`${expDate.getFullYear()}${expDate.getMonth()}${expDate.getDay()}`);
        if (nowInt > expInt) {
          throw new Error("Masa aktif License sudah berakhir di tanggal " + expire_date);
        }

        var allRoom = await dbMysql.room.findAll({ where: { user_id: data.user_id, end_live_date: { [Op.eq]: null } } });
        for (let i = 0; i < allRoom.length; i++) {
          const e = allRoom[i];
          var id = e.id;
          var now = help.dateTimeNow();
          await dbMysql.room.update({ end_live_date: now, end_reason: "Change username tiktok" }, { where: { id: id } });
        }
        await dbMysql.room.create({ user_id: data.user_id, tiktok_username: username, created_by: license });

        await help.upsert(dbMysql.tiktok_account, { username: username }, { username: username });
        require("../live")(req.io);
      } else {
        throw new Error("Akun tidak ditemukan");
      }
      res.send({ status: true, remarks: "Successfully set username" });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },
};
