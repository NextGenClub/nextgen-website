"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("ideas", "createdAt", {
         type: Sequelize.DATE,
         allowNull: false,
         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });

      await queryInterface.addColumn("ideas", "updatedAt", {
         type: Sequelize.DATE,
         allowNull: false,
         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("ideas", "createdAt");
      await queryInterface.removeColumn("ideas", "updatedAt");
   },
};
