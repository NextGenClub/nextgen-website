"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("users", "googleId", {
         type: Sequelize.STRING,
         allowNull: true,
         unique: true,
      });

      await queryInterface.addColumn("users", "githubId", {
         type: Sequelize.STRING,
         allowNull: true,
         unique: true,
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("users", "googleId");
      await queryInterface.removeColumn("users", "githubId");
   },
};
