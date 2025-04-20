"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addConstraint("votes", {
         fields: ["ideaid"],
         type: "foreign key",
         name: "votes_ideaid_fkey",
         references: {
            table: "ideas",
            field: "id",
         },
         onDelete: "CASCADE",
         onUpdate: "CASCADE",
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeConstraint("votes", "votes_ideaid_fkey");
   },
};
