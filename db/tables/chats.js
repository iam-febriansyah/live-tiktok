module.exports = (sequelize, Sequelize) => {
    const chats = sequelize.define(
        "chats",
        {
            chat_id_key: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            account: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
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
            followRole: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isModerator: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            isNewGifter: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            isSubscriber: {
                type: Sequelize.BOOLEAN,
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
            createdAt: {
                type: 'TIMESTAMP',
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
