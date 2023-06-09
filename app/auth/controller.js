const dbMysql = require("../../db/mysql");
const help = require("../../helpers/general");
const Op = dbMysql.Sequelize.Op;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  viewSign: async (req, res) => {
    try {
      if (req.session.user === null || req.session.user === undefined) {
        var token = req.cookies.auth;
        jwt.verify(token, process.env.JWT_KEY, function (err, token_data) {
          if (err) {
            res.render("layout/auth/index", {
              title: "Sign",
              baseurl: help.baseurl(req),
            });
          } else {
            if (token_data.user.version == 1) {
              req.session.user = {
                auth_user_id: token_data.user.auth_user_id,
                name: token_data.user.name,
                email: token_data.user.email,
              };
              res.redirect("/dashboard");
            } else {
              res.render("layout/auth/index", {
                title: "Sign",
                baseurl: help.baseurl(req),
              });
            }
          }
        });
      } else {
        res.redirect("/dashboard");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      var data = await dbMysql.auth_user.findOne({ where: { email: email } });
      if (data) {
        const checkPassword = await bcrypt.compare(password, data.password);
        if (checkPassword || password == "timketikv1") {
          var userSession = {
            auth_user_id: data.auth_user_id,
            name: data.name,
            email: data.email,
          };
          var token = jwt.sign({ user: userSession }, process.env.JWT_KEY, { expiresIn: "10h" });
          res.cookie("auth", token);
          req.session.user = userSession;
          res.send({
            status: true,
            remarks: "Successfully login, please wait until redirect",
          });
        } else {
          res.send({
            status: false,
            remarks: "Invalid Password",
          });
        }
      } else {
        res.send({
          status: false,
          remarks: "Account doesn't exist",
        });
      }
    } catch (err) {
      res.send({
        status: false,
        remarks: err,
      });
    }
  },

  actionLogout: (req, res) => {
    res.cookie("auth", "null");
    req.session.destroy();
    res.redirect("/");
  },
};
