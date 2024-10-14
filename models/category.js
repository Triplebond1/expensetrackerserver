const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "category",
  }
);

Category.associate = (models) => {
  Category.hasMany(models.Expense);
};

module.exports = { Category };
