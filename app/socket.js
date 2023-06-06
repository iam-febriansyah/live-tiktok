function emitChat(io, data, account) {
  if (io != null || typeof io != "undefined") {
    io.emit("chat_"+account, data);
  }
}

function emitGift(io, data, account) {
  if (io != null || typeof io != "undefined") {
    io.emit("gift_"+account, data);
  }
}

module.exports = { emitChat, emitGift };
