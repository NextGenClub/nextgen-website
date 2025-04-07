"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn("users", "name", {
         type: Sequelize.STRING(100),
         allowNull: true,
         after: "email",
      });

      // Update existing records to use username as name
      await queryInterface.sequelize.query(
         "UPDATE users SET name = username WHERE name IS NULL"
      );

      // Now make it not null after setting default values
      await queryInterface.changeColumn("users", "name", {
         type: Sequelize.STRING(100),
         allowNull: false,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("users", "name");
   },
};
