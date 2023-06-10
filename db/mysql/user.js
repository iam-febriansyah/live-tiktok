module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      license: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: "DATETIME",
        allowNull: true,
      },
      last_activity_date: {
        type: "DATETIME",
        allowNull: true,
      },
      expire_date: {
        type: "DATE",
        allowNull: false,
      },
      on_live: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      tableName: "user",
      indexes: [
        {
          unique: true,
          fields: ["user_id"],
        },
        {
          unique: false,
          fields: ["email"],
        },
        {
          unique: false,
          fields: ["license"],
        },
      ],
    }
  );
  return user;
};
