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
        type: Sequelize.TEXT,
        allowNull: false,
      },

      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
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
          unique: false,
          fields: ["room_id"],
        },
      ],
    }
  );
  return gift;
};
