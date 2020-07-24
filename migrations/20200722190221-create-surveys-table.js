"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("Surveys", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING(1000),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: new Date()
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date()
        }
      });
    } catch (err) {
      console.log("an error occurred==>>>", err);
    }
  },

  down: async queryInterface => {
    try {
      await queryInterface.dropTable("Surveys");
    } catch (err) {
      console.log("an error occurred==>>>", err);
    }
  }
};
