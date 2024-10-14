
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); 

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Name is required
      validate: {
        notEmpty: true, // Prevent empty strings
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Email is required
      unique: true, // Ensure unique emails
      validate: {
        isEmail: true, // Validate email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password is required
      validate: {
        notEmpty: true, // Prevent empty strings
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    tableName: "users", // Optional: specify table name
    freezeTableName: true,
  }
);

User.associate = (models) => {
  User.hasMany(models.Expense);
};
module.exports = { User };
