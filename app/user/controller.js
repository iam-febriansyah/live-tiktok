const dbMysql = require("../../db/mysql");
const help = require("../../helpers/general");
const Op = dbMysql.Sequelize.Op;

const { v1: uuidv1 } = require("uuid");

const url = (req) => { return help.baseurl(req) + "/user"; };

module.exports = {
  index: async (req, res) => {
    try {
      var data = {
        session: req.session,
        title: "User",
        page_title: "User",
        folder: "User",
        versionUpdate : help.nowNoSpace(),
        baseurl: url(req),
        baseurlDomain: help.baseurl(req),
      };
      res.render("layout/gift/user", data);
    } catch (err) {
      res.render("error", { error: err });
    }
  },

  getData: async (req, res) => {
    try {
      var data = await dbMysql.user.findAll({ where : { is_deleted : { [Op.eq]: null } } })
      res.send({ status: true, remarks: "Successfully", data: data });
    } catch (err) {
      res.send({status: false, remarks: err, data: []});
    }
  },

  getSingle: async (req, res) => {
    try {
      var { user_id } = req.body;
      var data = await dbMysql.user.findOne({ where : { user_id : user_id, is_deleted : { [Op.eq]: null } } });
      if(!data){
        throw new Error("Akun tidak ditemukan"); 
      }
      res.send({ status: true, remarks: "Successfully", data: data });
    } catch (err) {
      res.send({status: false, remarks: err, data: []});
    }
  },

  addEdit: async (req, res) => {
    try {
      var createdBy = req.session.user.user_id;
      var { user_id, domain, email, license, expire_date } = req.body;

      var dataInsert = {
        domain : domain,
        email : email,
        license : license,
        expire_date : expire_date
      }

      var now = new Date();
      var nowInt = parseInt(`${now.getFullYear()}${now.getMonth()}${now.getDay()}`);
      var expDate = new Date(expire_date);
      var expInt = parseInt(`${expDate.getFullYear()}${expDate.getMonth()}${expDate.getDay()}`);
      if(nowInt > expInt){
        throw new Error("Expire date harus lebih dari tanggal hari ini"); 
      }
      if(user_id == ''){
        var cekEmail = await dbMysql.user.findOne({ where : { email : email, is_deleted : { [Op.eq]: null } } });
        var cekLicense = await dbMysql.user.findOne({ where : { license : license, is_deleted : { [Op.eq]: null } } });
        if(cekEmail){ throw new Error("Email sudah ada, harap gunakan Email lain"); }
        if(cekLicense){ throw new Error("License sudah ada, harap gunakan License lain"); }

        dataInsert.user_id = uuidv1();
        dataInsert.created_at = help.dateTimeNow()
        dataInsert.created_by = createdBy;
      }else{
        var edit = await dbMysql.user.findOne({ where : { user_id : user_id, is_deleted : { [Op.eq]: null } } });
        if(edit){
          if(edit.email != email){
            var cekEmail = await dbMysql.user.findOne({ where : { email : email, is_deleted : { [Op.eq]: null } } });
            if(cekEmail){ throw new Error("Email sudah ada, harap gunakan Email lain"); }
          }
          if(edit.license != license){
            var cekLicense = await dbMysql.user.findOne({ where : { license : license, is_deleted : { [Op.eq]: null } } });
            if(cekLicense){ throw new Error("License sudah ada, harap gunakan License lain"); }
          }
          dataInsert.user_id = user_id;
          dataInsert.updated_at = help.dateTimeNow()
          dataInsert.updated_by = createdBy;
        }else{
          dataInsert.user_id = uuidv1();
          dataInsert.created_at = help.dateTimeNow()
          dataInsert.created_by = createdBy;
        }
      }

      await help.upsert(dbMysql.user, dataInsert, { user_id : user_id });
      res.send({ status: true, remarks: "Successfully" });
    } catch (err) {
      res.send({status: false, remarks: err});
    }
  },

  del: async (req, res) => {
    try {
      var createdBy = req.session.user.user_id;
      var { user_id } = req.body;
      var edit = await dbMysql.user.findOne({ where : { user_id : user_id, is_deleted : { [Op.eq]: null } } });
      if(edit){
        var dataInsert = {};
        dataInsert.updated_at = help.dateTimeNow()
        dataInsert.updated_by = createdBy;
        dataInsert.is_deleted = `Deleted by ${createdBy} at ${help.dateTimeNow()}`;
        await help.upsert(dbMysql.user, dataInsert, { user_id : user_id });
      }else{
        throw new Error("User tidak ditemukan"); 
      }
      
      res.send({ status: true, remarks: "Successfully" });
    } catch (err) {
      res.send({status: false, remarks: err});
    }
  },

};
