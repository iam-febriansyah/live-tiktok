const { WebcastPushConnection } = require('tiktok-live-connector');
const db = require("./db");
const dbA = require("../db/config");


module.exports = async function(io) {
    var socket = io;

    var tiktokUsernames = await dbA.accounts.findAll();
    for (let i = 0; i < tiktokUsernames.length; i++) {
        const tiktokUsername = tiktokUsernames[i].account;
        const status = tiktokUsernames[i].status;
        const isRunning = tiktokUsernames[i].isRunning;
        const account_id_key = tiktokUsernames[i].account_id_key

        if(isRunning != 1){
            var tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

            if(status == 1){
                tiktokLiveConnection.connect().then(state => {
                    console.info(`Connected to ${tiktokUsername} ${state.roomId}`);
                }).catch(err => {
                    console.error('Failed to connect', err);
                })

                tiktokLiveConnection.on('chat',  async (data) => {
                    // console.log(data)
                    await db.insertChat(data, tiktokUsername, socket);
                })

                tiktokLiveConnection.on('gift', async (data) => {
                    // console.log(data)
                    await db.insertGift(data, tiktokUsername, socket);
                });

                await dbA.accounts.update({isRunning : 1}, { where : { account_id_key : account_id_key }});
            }else{
                tiktokLiveConnection.disconnect();
            }
        }
    }
}
