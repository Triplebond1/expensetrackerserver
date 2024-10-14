const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { User } = require("./user");
const {Category} = require("./category");

const Expense = sequelize.define(
  "expense",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    naration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "expense",
  }
);
Expense.belongsTo(Category, {foreignKey: 'CategoryId', as:'category' });
Expense.belongsTo(User, {foreignKey: 'userId', as:'user' });

module.exports = { Expense };
