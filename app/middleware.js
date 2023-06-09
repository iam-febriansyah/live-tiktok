const jwt = require("jsonwebtoken");

module.exports = {
  jwtToSession: async (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      var token = req.cookies?.auth;
      jwt.verify(token, process.env.JWT_KEY, function (err, token_data) {
        if (err) {
          next();
        } else {
          req.session.user = {
            auth_user_id: token_data.user.auth_user_id,
            name: token_data.user.name,
            email: token_data.user.email,
          };
        }
      });
    } else {
      next();
    }
  },
};
