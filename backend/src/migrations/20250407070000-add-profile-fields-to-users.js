"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      // Add bio column
      await queryInterface.addColumn("users", "bio", {
         type: Sequelize.TEXT,
         allowNull: true,
      });

      // Add position column
      await queryInterface.addColumn("users", "position", {
         type: Sequelize.STRING(100),
         allowNull: true,
      });

      // Add avatar column
      await queryInterface.addColumn("users", "avatar", {
         type: Sequelize.STRING(255),
         allowNull: true,
      });

      // Add social_links column (JSON)
      await queryInterface.addColumn("users", "social_links", {
         type: Sequelize.JSON,
         allowNull: true,
      });

      // Add skills column (ARRAY)
      await queryInterface.addColumn("users", "skills", {
         type: Sequelize.ARRAY(Sequelize.STRING),
         allowNull: true,
      });

      // Add show_in_team column
      await queryInterface.addColumn("users", "show_in_team", {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("users", "bio");
      await queryInterface.removeColumn("users", "position");
      await queryInterface.removeColumn("users", "avatar");
      await queryInterface.removeColumn("users", "social_links");
      await queryInterface.removeColumn("users", "skills");
      await queryInterface.removeColumn("users", "show_in_team");
   },
};
