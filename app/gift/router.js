var express = require("express");
var router = express.Router();
const { index } = require("./controller");

const { jwtToSession } = require("../middleware");
router.use(jwtToSession);

router.use(async function (req, res, next) {
  if (req.session == null) {
    res.redirect("/logout");
  } else {
    next();
  }
});

router.get("/", index);

module.exports = router;
