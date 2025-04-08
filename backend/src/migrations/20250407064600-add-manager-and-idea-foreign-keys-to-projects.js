"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Add managerid column
      await queryInterface.addColumn("projects", "managerid", {
         type: Sequelize.INTEGER,
         allowNull: true,
         references: {
            model: "users",
            key: "id",
         },
      });

      // Add ideaid column
      await queryInterface.addColumn("projects", "ideaid", {
         type: Sequelize.INTEGER,
         allowNull: true,
         references: {
            model: "ideas",
            key: "id",
         },
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("projects", "managerid");
      await queryInterface.removeColumn("projects", "ideaid");
   },
};
