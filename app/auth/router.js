var express = require("express");
var router = express.Router();

const { actionSignin, viewSign, actionLogout } = require("./controller");

router.get("/", viewSign);
router.post("/", actionSignin);
router.get("/logout", actionLogout);
module.exports = router;
