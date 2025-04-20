"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Check if the enum type exists
      const enumExists = await queryInterface.sequelize.query(`
         SELECT typname FROM pg_type WHERE typname = 'enum_tasks_priority';
      `);

      if (!enumExists[0].length) {
         await queryInterface.sequelize.query(
            "CREATE TYPE enum_tasks_priority AS ENUM ('low', 'medium', 'high');"
         );
      }

      // Check if the columns exist
      const tableInfo = await queryInterface.describeTable("tasks");

      if (!tableInfo.priority) {
         await queryInterface.addColumn("tasks", "priority", {
            type: "enum_tasks_priority",
            allowNull: false,
            defaultValue: "medium",
         });
      }

      if (!tableInfo.dueDate) {
         await queryInterface.addColumn("tasks", "dueDate", {
            type: Sequelize.DATE,
            allowNull: true,
         });
      }
   },

   down: async (queryInterface, Sequelize) => {
      const tableInfo = await queryInterface.describeTable("tasks");

      if (tableInfo.dueDate) {
         await queryInterface.removeColumn("tasks", "dueDate");
      }

      if (tableInfo.priority) {
         await queryInterface.removeColumn("tasks", "priority");
      }

      // Check if the enum type exists and is not used by any other column
      const enumUsage = await queryInterface.sequelize.query(`
         SELECT typname FROM pg_type t
         JOIN pg_enum e ON t.oid = e.enumtypid
         JOIN pg_attribute a ON t.oid = a.atttypid
         WHERE typname = 'enum_tasks_priority';
      `);

      if (enumUsage[0].length === 0) {
         await queryInterface.sequelize.query(
            "DROP TYPE IF EXISTS enum_tasks_priority;"
         );
      }
   },
};
