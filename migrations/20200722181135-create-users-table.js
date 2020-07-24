"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable("Users", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: Sequelize.STRING,
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
      await queryInterface.dropTable("Users");
    } catch (err) {
      console.log("an error occurred==>>>", err);
    }
  }
};
