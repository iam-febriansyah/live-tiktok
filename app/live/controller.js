const help = require("../../helpers/general");

const url = (req) => {
  return help.baseurl(req) + "/live";
};

module.exports = {
  index: async (req, res) => {
    var createdBy = req.session.user?.auth_user_id;
    if (!createdBy) {
      help.forceLogout(res, req);
    }
    try {
      var data = {
        session: req.session,
        title: "Live Stream",
        page_title: "Live Stream",
        folder: "Live Stream",
        versionUpdate: help.nowNoSpace(),
        sekarang: help.dateNow(),
        baseurl: url(req),
        baseurlDomain: help.baseurl(req),
      };
      res.render("layout/live/index", data);
    } catch (err) {
      res.render("error", { error: err });
    }
  },
};
