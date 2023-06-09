const dbMysql = require("../../db/mysql");
const help = require("../../helpers/general");
const Op = dbMysql.Sequelize.Op;

const url = (req) => {
  return help.baseurl(req) + "/dashboard";
};

module.exports = {
  index: async (req, res) => {
    var createdBy = req.session.user?.auth_user_id;
    if(!createdBy){ help.forceLogout(res, req); }
    try {
      var data = {
        session: req.session,
        title: "Dashboard",
        page_title: "Dashboard",
        folder: "Dashboard",
        versionUpdate : help.nowNoSpace(),
        baseurl: url(req),
        baseurlDomain: help.baseurl(req),
      };
      res.render("layout/dashboard/index", data);
    } catch (err) {
      res.render("error", { error: err });
    }
  },
};
