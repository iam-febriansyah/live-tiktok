const dotenv = require("dotenv");
dotenv.config();

/**Database */
const db = require("../../db/config");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

/**Library */
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { v1: uuidv1 } = require("uuid");
var jwt = require("jsonwebtoken");

/**Helpers*/
const help = require("../helper");
const so = require("../socket");


module.exports = {
  addUser: async (req, res) => {
    console.log("POST ADD USER");
    try {
      var { username } = req.body;
      if(typeof username == "undefined" || username == ""){
        throw "Please enter username";
      }
      var account_id_key = uuidv1();
      await db.accounts.create({
        account_id_key : account_id_key,
        account : username,
        status : 1,
        isRunning : 0
      });
      var datas = await db.accounts.findAll();
      require('../live')(req.io);
      res.send({ status: true, remarks: "Successfuly add user", data: datas });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },

  nonActiveUser: async (req, res) => {
    console.log("POST NON ACTIVE USER");
    try {
      var { username } = req.body;
      if(typeof username == "undefined" || username == ""){
        throw "Please enter username";
      }
      await db.accounts.update({
        status : 0,
        isRunning : 0
      }, { where : { account : username } });
      var datas = await db.accounts.findAll();
      require('../live')(req.io);
      res.send({ status: true, remarks: "Successfuly not active user", data: datas });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },

  activeUser: async (req, res) => {
    console.log("POST ACTIVE USER");
    try {
      var { username } = req.body;
      if(typeof username == "undefined" || username == ""){
        throw "Please enter username";
      }
      await db.accounts.update({
        status : 1,
        isRunning : 0
      }, { where : { account : username } });
      var datas = await db.accounts.findAll();
      require('../live')(req.io);
      res.send({ status: true, remarks: "Successfuly not active user", data: datas });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },

  listChat: async (req, res) => {
    console.log("POST CHAT LIST");
    try {
      var { limit, username } = req.body;
      // if(typeof limit == "undefined" || limit == ""){
      //   limit = 1000;
      // }
      // var datas = await db.chats.findAll({
      //   where : { account : username },
      //   limit: limit,
      //   subQuery: false,
      //   order: [[sequelize.col("createdAt"), "DESC"]], 
      // });
      // res.send({ status: true, remarks: "Successfuly get chat list", data: datas });
      res.send({ status: false, remarks: "API under maintenance", data: [] });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },

  listGift: async (req, res) => {
    console.log("POST GIFT LIST");
    try {
      var { limit, username } = req.body;
      // if(typeof limit == "undefined" || limit == ""){
      //   limit = 1000;
      // }
      // var datas = await db.gifts.findAll({
      //   where : { account : username },
      //   limit: limit,
      //   subQuery: false,
      //   include : [
      //     { model: db.gift_extras, required: false },
      //   ],
      //   order: [[sequelize.col("gifts.createdAt"), "DESC"]], 
      // });
      // res.send({ status: true, remarks: "Successfuly get gift list", data: datas });
      res.send({ status: false, remarks: "API under maintenance", data: [] });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },
};
