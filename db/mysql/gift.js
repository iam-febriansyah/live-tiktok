module.exports = (sequelize, Sequelize) => {
  const gift = sequelize.define(
    "gift",
    {
      gift_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      room_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      json_data: {
        type: "LONGTEXT",
        allowNull: false,
      },

      created_at: {
        type: "DATETIME",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updated_at: {
        type: "DATETIME",
        defaultValue: null,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "gift",
      indexes: [
        {
          unique: true,
          fields: ["gift_id"],
        },
        {
          unique: false,
          fields: ["room_id"],
        },
      ],
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    }
  );
  return gift;
};
