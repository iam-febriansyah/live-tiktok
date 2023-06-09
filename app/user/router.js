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
router.post("/put", addEdit);
router.post("/del", del);
router.post("/get-data", getData);
router.post("/get-single", getSingle);

module.exports = router;
