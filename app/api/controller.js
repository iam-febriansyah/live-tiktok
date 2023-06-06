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
  listChat: async (req, res) => {
    console.log("POST CHAT LIST");
    try {
      var { limit } = req.body;
      if(typeof limit == "undefined" || limit == ""){
        limit = 1000;
      }
      var datas = await db.chats.findAll({
        limit: limit,
        subQuery: false,
        order: [[sequelize.col("createdAt"), "DESC"]], 
      });
      res.send({ status: true, remarks: "Successfuly get chat list", data: datas });
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
      var { limit } = req.body;
      if(typeof limit == "undefined" || limit == ""){
        limit = 1000;
      }
      var datas = await db.gifts.findAll({
        limit: limit,
        subQuery: false,
        include : [
          { model: db.gift_extras, required: false },
        ],
        order: [[sequelize.col("createdAt"), "DESC"]], 
      });
      res.send({ status: true, remarks: "Successfuly get gift list", data: datas });
    } catch (err) {
      if (err.message) {
        err = err.message;
      }
      res.send({ status: false, remarks: err });
    }
  },
};
