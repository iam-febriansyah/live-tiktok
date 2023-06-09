const dbMysql = require("../../db/mysql");
const help = require("../../helpers/general");
const Op = dbMysql.Sequelize.Op;

const { QueryTypes } = require("sequelize");

const url = (req) => { return help.baseurl(req) + "/gift"; };

async function getGift(start, end){
  var query = `SELECT 
      r.room_id,
      r.user_id,
      r.tiktok_username,
      r.start_live_date,
      r.end_live_date,
      r.created_at,
      u.domain,
      u.email,
      u.license,
      CASE WHEN g.total IS NULL THEN 0 ELSE g.total END as total
    FROM room r 
    INNER JOIN user u ON u.user_id = r.user_id
    LEFT JOIN (SELECT COUN(gift_id) total FROM gift GROUP BY room_id) g
      on g.room_id = r.room_id
    WHERE start_live_date between '${start}' AND '${end}'`;
  var data = await sequelize.query(query, { type: QueryTypes.SELECT });
  return data;
}

module.exports = {
  index: async (req, res) => {
    var createdBy = req.session.user?.user_id;
    if(!createdBy){ help.forceLogout(res, req); }
    try {
      var data = {
        session: req.session,
        title: "Gift",
        page_title: "Gift",
        folder: "Gift",
        versionUpdate : help.nowNoSpace(),
        baseurl: url(req),
        baseurlDomain: help.baseurl(req),
      };
      res.render("layout/gift/index", data);
    } catch (err) {
      res.render("error", { error: err });
    }
  },

  getData: async (req, res) => {
    try {
      const { start, end } = req.body;
      var data = await getGift(start, end);
      res.send({ status: true, remarks: "Successfully", data: data });
    } catch (err) {
      res.send({status: false, remarks: err, data: []});
    }
  },

  getDetails: async (req, res) => {
    try {
      const { room_id } = req.body;
      var data = await dbMysql.gift.findAll({ where : { room_id : room_id } });
      res.send({ status: true, remarks: "Successfully", data: data });
    } catch (err) {
      res.send({status: false, remarks: err, data: []});
    }
  },

};
