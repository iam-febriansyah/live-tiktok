module.exports = (sequelize, Sequelize) => {
    const gift_extras = sequelize.define(
        "gift_extras",
        {
            gift_extra_id_key: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            gift_id_key: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            repeat_end: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            to_user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            gift_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            send_gift_send_message_success_ms: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            gift_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            anchor_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            from_idc: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            repeat_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            send_gift_profit_api_start_ms: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            send_gift_req_start_ms: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            send_gift_profit_core_start_ms: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            profitapi_message_dur: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            send_profitapi_dur: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            log_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            room_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            from_user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            msg_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: "gift_extras",
            indexes: [
                {
                    unique: true,
                    fields: ["gift_extra_id_key"],
                },
                {
                    unique: false,
                    fields: ["gift_id_key"],
                },
            ],
        }
    );
    return gift_extras;
};
