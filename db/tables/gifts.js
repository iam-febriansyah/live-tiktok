module.exports = (sequelize, Sequelize) => {
    const gifts = sequelize.define(
        "gifts",
        {
            gift_id_key: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            msgId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            giftId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            repeatCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            groupId: {
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
            gift_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            repeat_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            repeat_end: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            gift_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            describe: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            giftName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            diamondCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            giftPictureUrl: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            timestamp: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            receiverUserId: {
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
            tableName: "gifts",
            indexes: [
                {
                    unique: true,
                    fields: ["gift_id_key"],
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
    return gifts;
};
