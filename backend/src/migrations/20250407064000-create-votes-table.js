"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("votes", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         ideaid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "ideas",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         userid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "users",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
         },
      });

      // Add unique constraint to prevent duplicate votes
      await queryInterface.addConstraint("votes", {
         fields: ["ideaid", "userid"],
         type: "unique",
         name: "unique_vote",
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("votes");
   },
};
