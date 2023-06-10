module.exports = (sequelize, Sequelize) => {
  const tiktok_account = sequelize.define(
    "tiktok_account",
    {
      account_id_key: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isRunning: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      tableName: "tiktok_account",
      indexes: [
        {
          unique: true,
          fields: ["account_id_key"],
        },
        {
          unique: true,
          fields: ["username"],
        },
      ],
    }
  );
  return tiktok_account;
};
