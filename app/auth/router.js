var express = require("express");
var router = express.Router();

const { actionSignin, viewSign } = require("./controller");

router.get("/", viewSign);
router.post("/", actionSignin);
module.exports = router;
