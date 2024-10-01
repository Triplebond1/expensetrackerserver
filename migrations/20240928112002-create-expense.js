"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("expense", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, 
        primaryKey: true, 
      },

      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false, 
      },

      naration: {
        type: Sequelize.STRING,
        allowNull: false, 
      },

      userId: {
        type: Sequelize.UUID,
        references: {
         
          model: "users", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      CategoryId: {
        type: Sequelize.UUID,
        references: {
          
          model: "category", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false, 
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false, 
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("expense");
  },
};
