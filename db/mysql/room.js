module.exports = (sequelize, Sequelize) => {
  const room = sequelize.define(
    "room",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      room_id: {
        type: Sequelize.STRING,
        allowNull: true,
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
        type: "DATETIME",
        defaultValue: null,
        allowNull: true,
      },
      end_live_date: {
        type: "DATETIME",
        defaultValue: null,
        allowNull: true,
      },
      end_reason: {
        type: Sequelize.STRING,
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
      tableName: "room",
      indexes: [
        {
          unique: false,
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
