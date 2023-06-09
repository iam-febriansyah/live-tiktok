var express = require("express");
var router = express.Router();

const { access, setUsername } = require("./controller");

router.post("/access", access);
router.post("/set-username", setUsername);
module.exports = router;
