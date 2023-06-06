
const dotenv = require("dotenv");
dotenv.config();
const { v1: uuidv1 } = require("uuid");

const db = require("../db/config");
const socket = require("./socket");
const help = require("./helper");
const Op = db.Sequelize.Op;


const insertChat = async (data, account, io) => {
    var createdAt = help.dateToString(parseInt(data.createTime))
    var chat_id_key = uuidv1();
    var dataInsert = {
        chat_id_key : chat_id_key,
        account: account,
        msgId: data.msgId,
        secUid: data.secUid,
        userId: data.userId,
        uniqueId: data.uniqueId,
        nickname: data.nickname,
        profilePictureUrl: data.profilePictureUrl,
        createTime: data.createTime,
        comment: data.comment,
        followRole: data.followRole,
        isModerator: data.isModerator,
        isNewGifter: data.isNewGifter,
        isSubscriber: data.isSubscriber,
        createdAt: createdAt
    }
    socket.emitChat(io, dataInsert, account);
    // var res await db.chats.create(dataInsert);
    return dataInsert;
};

const insertGift = async (data, account, io) => {
    var createdAt = help.dateToString(data.timestamp)
    var gift_id_key = uuidv1();
    var dataInsert = {
        gift_id_key: gift_id_key,
        account: account,
        msgId: data.msgId,
        giftId: data.giftId,
        repeatCount: data.repeatCount,
        groupId: data.groupId,
        secUid: data.secUid,
        userId: data.userId,
        uniqueId: data.uniqueId,
        nickname: data.nickname,
        profilePictureUrl: data.profilePictureUrl,
        createTime: data.createTime,
        gift_id: data.gift.gift_id,
        repeat_count: data.gift.repeat_count,
        repeat_end: data.gift.repeat_end,
        gift_type: data.gift.gift_type,
        describe: data.describe,
        giftName: data.giftName,
        diamondCount: data.diamondCount,
        giftPictureUrl: data.giftPictureUrl,
        timestamp: data.timestamp,
        receiverUserId: data.receiverUserId,
        createdAt: createdAt
    }
    // var res = await db.gifts.create(dataInsert);
    var res = dataInsert;
    if(data.monitorExtra){
        // data.monitorExtra.gift_id_key = gift_id_key;
        // data.monitorExtra.createdAt = createdAt;
        // res.extra = await insertGiftExtra(data.monitorExtra);
        res.extra = {
            gift_id_key: gift_id_key,
            repeat_end: data.monitorExtra.repeat_end,
            to_user_id: data.monitorExtra.to_user_id,
            gift_type: data.monitorExtra.gift_type,
            send_gift_send_message_success_ms: data.monitorExtra.send_gift_send_message_success_ms,
            gift_id: data.monitorExtra.gift_id,
            anchor_id: data.monitorExtra.anchor_id,
            from_idc: data.monitorExtra.from_idc,
            repeat_count: data.monitorExtra.repeat_count,
            send_gift_profit_api_start_ms: data.monitorExtra.send_gift_profit_api_start_ms ?? 0,
            send_gift_req_start_ms: data.monitorExtra.send_gift_req_start_ms ?? 0,
            send_gift_profit_core_start_ms: data.monitorExtra.send_gift_profit_core_start_ms ?? 0,
            profitapi_message_dur: data.monitorExtra.profitapi_message_dur ?? 0,
            send_profitapi_dur: data.monitorExtra.send_profitapi_dur ?? 0,
            log_id: data.monitorExtra.log_id,
            room_id: data.monitorExtra.room_id,
            from_user_id: data.monitorExtra.from_user_id,
            msg_id: data.monitorExtra.msg_id,
        }
    }
    socket.emitGift(io, res, account);
    return res;
};

const insertGiftExtra = async (data) => {
    var gift_extra_id_key = uuidv1();
    var dataInsert = {
        gift_extra_id_key: gift_extra_id_key,
        gift_id_key: data.gift_id_key,
        repeat_end: data.repeat_end,
        to_user_id: data.to_user_id,
        gift_type: data.gift_type,
        send_gift_send_message_success_ms: data.send_gift_send_message_success_ms,
        gift_id: data.gift_id,
        anchor_id: data.anchor_id,
        from_idc: data.from_idc,
        repeat_count: data.repeat_count,
        send_gift_profit_api_start_ms: data.send_gift_profit_api_start_ms ?? 0,
        send_gift_req_start_ms: data.send_gift_req_start_ms ?? 0,
        send_gift_profit_core_start_ms: data.send_gift_profit_core_start_ms ?? 0,
        profitapi_message_dur: data.profitapi_message_dur ?? 0,
        send_profitapi_dur: data.send_profitapi_dur ?? 0,
        log_id: data.log_id,
        room_id: data.room_id,
        from_user_id: data.from_user_id,
        msg_id: data.msg_id,
        createdAt: data.createdAt
    }
    var res// = await db.gift_extras.create(dataInsert);
    return res;
}

const destroyDb = async () => {
   await db.chats.destroy({ truncate : true, cascade: false });
   await db.gift_extras.destroy({ truncate : true, cascade: false });
   await db.gifts.destroy({ truncate : true, cascade: false });
}

module.exports = {
    insertChat,
    insertGift,
    destroyDb
};
