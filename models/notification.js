const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Notification = sequelize.define(
  "notification",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "notification",
  }
);

Notification.belongsTo(User, { foreignKey: "userId", as: "user" });
module.exports = { Notification };
