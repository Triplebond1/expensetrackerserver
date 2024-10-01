const { Datatypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: Datatypes.UUID,
      defaultValue: Datatypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },

    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = User;
