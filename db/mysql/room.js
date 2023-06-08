module.exports = (sequelize, Sequelize) => {
  const room = sequelize.define(
    "room",
    {
      room_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tiktok_username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_live_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_live_date: {
        type: Sequelize.DATE,
        allowNull: true,
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
      tableName: "room",
      indexes: [
        {
          unique: true,
          fields: ["room_id"],
        },
        {
          unique: false,
          fields: ["user_id"],
        },
      ],
    }
  );
  return room;
};
