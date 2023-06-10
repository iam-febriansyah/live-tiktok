const dbMysql = require("../../db/mysql");
const help = require("../../helpers/general");
const Op = dbMysql.Sequelize.Op;

const url = (req) => {
  return help.baseurl(req) + "/dashboard";
};

async function getDashboard(req) {
  var ctUser = await dbMysql.user.count({ col: "user.user_id" });
  var ctUserTiktok = await dbMysql.tiktok_account.count({ col: "tiktok_account.username" });
  var ctGift = await dbMysql.gift.count({ col: "gift.gift_id" });
  var ctLive = await dbMysql.tiktok_account.count({ where: { isRunning: 1 } }, { col: "tiktok_account.username" });
  var data = {
    ct_user: ctUser,
    ct_user_tiktok: ctUserTiktok,
    ct_gift: ctGift,
    ct_live: ctLive,
  };
  req.io.emit("ct", data);
}

module.exports = {
  index: async (req, res) => {
    var createdBy = req.session.user?.auth_user_id;
    if (!createdBy) {
      help.forceLogout(res, req);
    }
    try {
      var data = {
        session: req.session,
        title: "Dashboard",
        page_title: "Dashboard",
        folder: "Dashboard",
        versionUpdate: help.nowNoSpace(),
        baseurl: url(req),
        baseurlDomain: help.baseurl(req),
      };
      setInterval(function () {
        getDashboard(req);
      }, 1000);

      res.render("layout/dashboard/index", data);
    } catch (err) {
      res.render("error", { error: err });
    }
  },
};
