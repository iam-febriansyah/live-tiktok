var express = require("express");
var router = express.Router();

const { listChat, listGift } = require("./controller");

router.post("/chats", listChat);
router.post("/gifts", listGift);
module.exports = router;
