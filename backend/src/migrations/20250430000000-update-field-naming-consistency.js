"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      // First, check if the columns exist before trying to rename
      const projectColumns = await queryInterface.describeTable("projects");
      if (projectColumns.createdat && !projectColumns.createdAt) {
         await queryInterface.renameColumn(
            "projects",
            "createdat",
            "createdAt"
         );
      }

      const ideaColumns = await queryInterface.describeTable("ideas");
      if (ideaColumns.createdat && !ideaColumns.createdAt) {
         await queryInterface.renameColumn("ideas", "createdat", "createdAt");
      }
      if (ideaColumns.updatedat && !ideaColumns.updatedAt) {
         await queryInterface.renameColumn("ideas", "updatedat", "updatedAt");
      }
      if (ideaColumns.documenturl && !ideaColumns.documentUrl) {
         await queryInterface.renameColumn(
            "ideas",
            "documenturl",
            "documentUrl"
         );
      }
      if (ideaColumns.votecount && !ideaColumns.voteCount) {
         await queryInterface.renameColumn("ideas", "votecount", "voteCount");
      }

      const taskColumns = await queryInterface.describeTable("tasks");
      if (!taskColumns.createdAt) {
         await queryInterface.addColumn("tasks", "createdAt", {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
         });
      }
   },

   async down(queryInterface, Sequelize) {
      const projectColumns = await queryInterface.describeTable("projects");
      if (projectColumns.createdAt && !projectColumns.createdat) {
         await queryInterface.renameColumn(
            "projects",
            "createdAt",
            "createdat"
         );
      }

      const ideaColumns = await queryInterface.describeTable("ideas");
      if (ideaColumns.createdAt && !ideaColumns.createdat) {
         await queryInterface.renameColumn("ideas", "createdAt", "createdat");
      }
      if (ideaColumns.updatedAt && !ideaColumns.updatedat) {
         await queryInterface.renameColumn("ideas", "updatedAt", "updatedat");
      }
      if (ideaColumns.documentUrl && !ideaColumns.documenturl) {
         await queryInterface.renameColumn(
            "ideas",
            "documentUrl",
            "documenturl"
         );
      }
      if (ideaColumns.voteCount && !ideaColumns.votecount) {
         await queryInterface.renameColumn("ideas", "voteCount", "votecount");
      }

      const taskColumns = await queryInterface.describeTable("tasks");
      if (taskColumns.createdAt) {
         await queryInterface.removeColumn("tasks", "createdAt");
      }
   },
};
