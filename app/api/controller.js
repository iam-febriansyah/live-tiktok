const dotenv = require("dotenv");
dotenv.config();

/**Database */
const dbMysql= require("../../db/mysql");
const Op = dbMysql.Sequelize.Op;

module.exports = {

  access: async (req, res) => {
    console.log("POST ACCESS USER");
    try {
      var { license } = req.body;
      if (typeof license == "undefined" || license == "") {
        throw "Please enter license";
      }
      var data = await dbMysql.user.findOne({ where : { license : license, is_deleted : { [Op.eq]: null } } });
      if(data){
        var expire_date = data.expire_date;
        var now = new Date();
        var nowInt = parseInt(`${now.getFullYear()}${now.getMonth()}${now.getDay()}`);
        var expDate = new Date(expire_date);
        var expInt = parseInt(`${expDate.getFullYear()}${expDate.getMonth()}${expDate.getDay()}`);
        if(nowInt > expInt){
          throw new Error("Masa aktif License sudah berakhir di tanggal "+expire_date); 
        }
      }else{
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
      var data = await dbMysql.user.findOne({ where : { license : license, is_deleted : { [Op.eq]: null } } });
      if(data){
        var expire_date = data.expire_date;
        var now = new Date();
        var nowInt = parseInt(`${now.getFullYear()}${now.getMonth()}${now.getDay()}`);
        var expDate = new Date(expire_date);
        var expInt = parseInt(`${expDate.getFullYear()}${expDate.getMonth()}${expDate.getDay()}`);
        if(nowInt > expInt){
          throw new Error("Masa aktif License sudah berakhir di tanggal "+expire_date); 
        }
        
        await dbMysql.room.create({ user_id : data.user_id, tiktok_username : username });
        require("../live")(req.io);

      }else{
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
