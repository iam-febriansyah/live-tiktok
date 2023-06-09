var express = require("express");
var router = express.Router();
const { index, addEdit, del, getData, getSingle } = require("./controller");

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
router.get("/put", addEdit);
router.get("/del", del);
router.get("/get-data", getData);
router.get("/get-single", getSingle);

module.exports = router;
