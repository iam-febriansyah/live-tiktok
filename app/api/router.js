var express = require("express");
var router = express.Router();

const { listChat, listGift, addUser, nonActiveUser, activeUser } = require("./controller");

router.post("/add", addUser);
router.post("/non-active", nonActiveUser);
router.post("/active", activeUser);

router.post("/chats", listChat);
router.post("/gifts", listGift);
module.exports = router;
