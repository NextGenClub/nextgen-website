"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      // Add name column
      await queryInterface.addColumn("users", "name", {
         type: Sequelize.STRING(100),
         allowNull: true,
      });

      // Add username column
      await queryInterface.addColumn("users", "username", {
         type: Sequelize.STRING(50),
         allowNull: true,
         unique: true,
      });

      // Update existing records to use email prefix as name and username
      await queryInterface.sequelize.query(`
      UPDATE users 
      SET name = split_part(email, '@', 1),
          username = split_part(email, '@', 1)
      WHERE name IS NULL OR username IS NULL
    `);

      // Now make them not null after setting default values
      await queryInterface.changeColumn("users", "name", {
         type: Sequelize.STRING(100),
         allowNull: false,
      });

      await queryInterface.changeColumn("users", "username", {
         type: Sequelize.STRING(50),
         allowNull: false,
         unique: true,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("users", "name");
      await queryInterface.removeColumn("users", "username");
   },
};
