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
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_activity_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expire_date: {
        type: Sequelize.DATE,
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
      tableName: "user",
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["user_id"],
        },
        {
          unique: true,
          fields: ["license"],
        },
      ],
    }
  );
  return user;
};
