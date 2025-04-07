"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("ideas", "status", {
         type: Sequelize.ENUM(
            "pending",
            "approved",
            "rejected",
            "in-progress",
            "completed"
         ),
         allowNull: false,
         defaultValue: "pending",
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("ideas", "status");
      await queryInterface.sequelize.query(
         'DROP TYPE IF EXISTS "enum_ideas_status";'
      );
   },
};
