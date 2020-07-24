"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("Answers", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        text: {
          type: Sequelize.STRING(510),
          allowNull: false
        },
        questionId: {
          type: Sequelize.INTEGER,
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
      await queryInterface.dropTable("Answers");
    } catch (err) {
      console.log("an error occurred==>>>", err);
    }
  }
};
