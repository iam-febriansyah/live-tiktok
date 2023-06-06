module.exports = (sequelize, Sequelize) => {
    const chats = sequelize.define(
        "chats",
        {
            chat_id_key: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            msgId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            secUid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            uniqueId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            profilePictureUrl: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            createTime: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: "chats",
            indexes: [
                {
                    unique: true,
                    fields: ["chat_id_key"],
                },
                {
                    unique: false,
                    fields: ["nickname"],
                },
                {
                    unique: false,
                    fields: ["createTime"],
                },
            ],
        }
    );
    return chats;
};
