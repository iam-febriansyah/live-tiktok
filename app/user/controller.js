const dbMysql = require("../../db/mysql");
const help = require("../../helpers/general");
const Op = dbMysql.Sequelize.Op;

const url = (req) => {
  return help.baseurl(req) + "/user";
};

module.exports = {
  index: async (req, res) => {
    try {
      var data = {
        session: req.session,
        title: "User",
        page_title: "User",
        folder: "User",
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
      var user_id = req.session?.user?.user_id;
      const { device_id, start, end } = req.body;
      var data = await getMessages(user_id, device_id, start, end);
      res.send({
        status: true,
        remarks: "Successfully",
        data: data,
      });
    } catch (err) {
      res.send({
        status: false,
        remarks: err,
        data: [],
      });
    }
  },
};
