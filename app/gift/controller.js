const dbMysql = require("../../db/mysql");
const help = require("../../helpers/general");
const Op = dbMysql.Sequelize.Op;

const url = (req) => {
  return help.baseurl(req) + "/gift";
};

module.exports = {
  index: async (req, res) => {
    try {
      var data = {
        session: req.session,
        title: "Gift",
        page_title: "Gift",
        folder: "Gift",
        baseurl: url(req),
        baseurlDomain: help.baseurl(req),
      };
      res.render("layout/gift/view", data);
    } catch (err) {
      res.render("error", { error: err });
    }
  },
};
