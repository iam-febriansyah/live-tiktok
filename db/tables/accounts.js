module.exports = (sequelize, Sequelize) => {
    const accounts = sequelize.define(
        "accounts",
        {
            account_id_key: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
            },
            account: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isRunning: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: "accounts",
            indexes: [
                {
                    unique: true,
                    fields: ["account"],
                },
            ],
        }
    );
    return accounts;
};
