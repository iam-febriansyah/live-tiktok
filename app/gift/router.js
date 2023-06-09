var express = require("express");
var router = express.Router();
const { index, getDetails, getData } = require("./controller");

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
router.get("/get-data", getData);
router.get("/get-details", getDetails);

module.exports = router;
