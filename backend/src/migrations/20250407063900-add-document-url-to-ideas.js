"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("ideas", "documentUrl", {
         type: Sequelize.STRING(255),
         allowNull: true,
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("ideas", "documentUrl");
   },
};
