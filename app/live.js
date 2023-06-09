const { WebcastPushConnection } = require('tiktok-live-connector');
const dbMysql = require("../db/mysql");
const socket = require("./socket");
const help = require("../helpers/general");

module.exports = async function(io) {

    var rooms = await dbMysql.room.findAll({ where : { end_live_date : { [Op.eq]: null } } });
    for (let i = 0; i < rooms.length; i++) {
        const id = rooms[i].id;
        const room_id = rooms[i].room_id;
        const user_id = rooms[i].user_id;
        const tiktok_username = rooms[i].tiktok_username;
        var user = await dbMysql.user.findOne({ where : { user_id : user_id } });
        var license = user.license;
        if(room_id == null){
            var tiktokLiveConnection = new WebcastPushConnection(tiktok_username);

            tiktokLiveConnection.connect().then(async (state) => {
                room_id = state.roomId;
                var now = help.dateTimeNow()
                await dbMysql.room.update({ room_id : state.roomId, start_live_date : now }, { where : { id : id  } })
            }).catch(err => {
                console.error('Failed to connect', err);
            })
    
            tiktokLiveConnection.on('chat',  async (data) => {
                socket.emitChat(io, data, tiktok_username, license);
            })
    
            tiktokLiveConnection.on('gift', async (data) => {
                socket.emitChat(io, data, tiktok_username, license);
                var json_data = JSON.stringify(data);
                await dbMysql.gift.create({ room_id : room_id, json_data : json_data });
            });
    
            tiktokLiveConnection.on('streamEnd', async (actionId) => {
                var end_reason = actionId;
                if (actionId === 3) {
                    end_reason = 'Stream ended by user';
                }
                if (actionId === 4) {
                    end_reason = 'Stream ended by platform moderator (ban)';
                }
                var now = help.dateTimeNow();
                await dbMysql.room.update({ end_live_date : now, end_reason: end_reason }, { where : { id : id  } })
            })

            tiktokLiveConnection.on('disconnected', async () => {
                var now = help.dateTimeNow();
                await dbMysql.room.update({ end_live_date : now, end_reason : "Socket disconnect" }, { where : { id : id  } })
            })
        }
    }
}
