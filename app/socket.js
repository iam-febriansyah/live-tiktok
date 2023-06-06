function emitChat(io, data) {
  if (io != null || typeof io != "undefined") {
    io.emit("chat", data);
  }
}

function emitGift(io, data) {
  if (io != null || typeof io != "undefined") {
    io.emit("gift", data);
  }
}

module.exports = { emitChat, emitGift };
