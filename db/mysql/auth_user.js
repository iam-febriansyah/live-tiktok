module.exports = (sequelize, Sequelize) => {
  const auth_user = sequelize.define(
    "auth_user",
    {
      auth_user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
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
        defaultValue: null,
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "auth_user",
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );
  return auth_user;
};
