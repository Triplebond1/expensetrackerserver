const { Datatypes } = require("sequelize");
const sequelize = require("../db");

const Category = sequelize.define(
  "Category",
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
  },
  { timestamps: true }
);

module.exports = Category;
