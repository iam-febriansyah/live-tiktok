function emitChat(io, data, account, license) {
  if (io != null || typeof io != "undefined") {
    io.emit("chat_" + account + "_" + license, data);
  }
}

function emitGift(io, data, account, license) {
  if (io != null || typeof io != "undefined") {
    io.emit("gift_" + account + "_" + license, data);
  }
}

module.exports = { emitChat, emitGift };
