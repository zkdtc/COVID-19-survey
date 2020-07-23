"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("Respondents", {
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
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          isEmail: true
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
          min: 1,
          max: 99
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
      await queryInterface.dropTable("Respondents");
    } catch (err) {
      console.log("an error occurred==>>>", err);
    }
  }
};
