const { WebcastPushConnection } = require('tiktok-live-connector');
const db = require("./db");


module.exports = function(io) {
    var socket = io;
    // Username of someone who is currently live
    let tiktokUsername = "upfollowers.gacor";

    // Create a new wrapper object and pass the username
    let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

    // Connect to the chat (await can be used as well)
    tiktokLiveConnection.connect().then(state => {
        // console.info(`Connected to roomId ${state.roomId}`);
        // console.info(state);
    }).catch(err => {
        console.error('Failed to connect', err);
    })

    // Define the events that you want to handle
    // In this case we listen to chat messages (comments)
    tiktokLiveConnection.on('chat',  async (data) => {
        await db.insertChat(data, socket);
    })

    // And here we receive gifts sent to the streamer
    tiktokLiveConnection.on('gift', async (data) => {
        // console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
        // console.log(data);
        await db.insertGift(data, socket);
    })
}
