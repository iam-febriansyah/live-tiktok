const { WebcastPushConnection } = require("tiktok-live-connector");
const dbMysql = require("../db/mysql");
const socket = require("./socket");
const help = require("../helpers/general");
const worker = require("../worker/_index");
const { v1: uuidv1 } = require("uuid");

/**Database */
const Op = dbMysql.Sequelize.Op;
const { QueryTypes } = require("sequelize");
var licenses = [];

async function liveStream(acc, io) {
  var tiktok_username = acc.username;
  if (acc.isRunning == 0) {
    await dbMysql.tiktok_account.update({ isRunning: 1 }, { where: { username: tiktok_username } });
    var tiktokLiveConnection = new WebcastPushConnection(tiktok_username);
    tiktokLiveConnection
      .connect()
      .then(async (state) => {
        var now = help.dateTimeNow();
        console.log("CONNECT " + tiktok_username, state.roomId);
        for (let i = 0; i < licenses.length; i++) {
          const id = licenses[i].id;
          licenses[i].room_id = state.roomId;
          await dbMysql.room.update({ room_id: state.roomId, start_live_date: now }, { where: { id: id, tiktok_username: tiktok_username } });
        }
      })
      .catch(async (err) => {
        console.log(err);
        var now = help.dateTimeNow();
        for (let i = 0; i < licenses.length; i++) {
          const id = licenses[i].id;
          const license = licenses[i].license;
          await dbMysql.room.update({ room_id: license + ":Offline:" + tiktok_username, start_live_date: now, end_live_date: now, end_reason: "Error connect" }, { where: { id: id, tiktok_username: tiktok_username } });
        }
        await dbMysql.tiktok_account.update({ status: 0, isRunning: 0 }, { where: { username: tiktok_username } });
      });

    tiktokLiveConnection.on("chat", async (data) => {
      data.createdAt = help.dateTimeNow();
      for (let i = 0; i < licenses.length; i++) {
        const license = licenses[i].license;
        console.log("CHAT " + tiktok_username + " " + license, convertChat(data));
        socket.emitChat(io, convertChat(data), tiktok_username, license);
      }
    });

    tiktokLiveConnection.on("gift", async (data) => {
      data.createdAt = help.dateTimeNow();
      for (let i = 0; i < licenses.length; i++) {
        var gift_id_key = uuidv1();
        const license = licenses[i].license;
        const room_id = licenses[i].room_id;
        socket.emitGift(io, data, tiktok_username, license);
        var json_data = convertGift(data);
        json_data.createdAt = help.dateTimeNow();
        if (room_id) {
          worker.worker_insertGift({ room_id: room_id, json_data: json_data, created_by: license });
        }
      }
    });

    tiktokLiveConnection.on("streamEnd", async (actionId) => {
      var end_reason = actionId;
      if (actionId === 3) {
        end_reason = "Stream ended by user";
      }
      if (actionId === 4) {
        end_reason = "Stream ended by platform moderator (ban)";
      }
      var now = help.dateTimeNow();
      for (let i = 0; i < licenses.length; i++) {
        const id = licenses[i].id;
        await dbMysql.room.update({ end_live_date: now, end_reason: end_reason }, { where: { id: id, tiktok_username: tiktok_username } });
      }
      await dbMysql.tiktok_account.update({ status: 0 }, { where: { username: tiktok_username } });
    });

    tiktokLiveConnection.on("disconnected", async () => {
      var now = help.dateTimeNow();
      await dbMysql.tiktok_account.update({ isRunning: 0 }, { where: { username: tiktok_username } });
      await dbMysql.room.update({ end_live_date: now, end_reason: "Socket disconnect" }, { where: { tiktok_username: tiktok_username } });
    });
  }
}

function convertGift(data) {
  var dataInsert = {
    gift_id_key: data.gift_id_key,
    msgId: data.msgId.toString(),
    giftId: data.giftId.toString(),
    repeatCount: data.repeatCount.toString(),
    groupId: data.groupId,
    secUid: data.secUid,
    userId: data.userId,
    uniqueId: data.uniqueId,
    nickname: data.nickname,
    profilePictureUrl: data.profilePictureUrl.toString(),
    createTime: data.createTime.toString(),
    gift_id: data.gift.gift_id.toString(),
    repeat_count: data.gift.repeat_count.toString(),
    repeat_end: data.gift.repeat_end.toString(),
    gift_type: data.gift.gift_type.toString(),
    describe: data.describe.toString(),
    giftName: data.giftName.toString(),
    diamondCount: data.diamondCount.toString(),
    giftPictureUrl: data.giftPictureUrl.toString(),
    timestamp: data.timestamp.toString(),
    receiverUserId: data.receiverUserId,
  };
  return dataInsert;
}

function convertChat(data) {
  var createdAt = help.dateToString(parseInt(data.createTime));
  var chat_id_key = uuidv1();
  var dataInsert = {
    chat_id_key: chat_id_key,
    msgId: data.msgId.toString(),
    secUid: data.secUid.toString(),
    userId: data.userId.toString(),
    uniqueId: data.uniqueId.toString(),
    nickname: data.nickname.toString(),
    profilePictureUrl: data.profilePictureUrl.toString(),
    createTime: data.createTime.toString(),
    comment: data.comment.toString(),
    followRole: data.followRole.toString(),
    isModerator: data.isModerator.toString(),
    isNewGifter: data.isNewGifter.toString(),
    isSubscriber: data.isSubscriber.toString(),
    createdAt: createdAt.toString(),
  };
  return dataInsert;
}

module.exports = async function (io) {
  var tiktokAccount = await dbMysql.tiktok_account.findAll();
  for (let j = 0; j < tiktokAccount.length; j++) {
    const username = tiktokAccount[j].username;
    var query = `SELECT r.id, r.room_id, u.license FROM room r 
                 INNER JOIN user u ON u.user_id = r.user_id
                 WHERE r.tiktok_username = '${username}' AND r.end_live_date IS NULL`;
    licenses = await dbMysql.sequelize.query(query, { type: QueryTypes.SELECT });
    liveStream(tiktokAccount[j], io);
  }
};
