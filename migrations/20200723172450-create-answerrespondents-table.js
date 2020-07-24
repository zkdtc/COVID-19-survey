"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("AnswerRespondents", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        answerId: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        respondentId: {
          type: Sequelize.STRING(255),
          allowNull: false,
          isEmail: true
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
      await queryInterface.dropTable("AnswerRespondents");
    } catch (err) {
      console.log("an error occurred==>>>", err);
    }
  }
};
