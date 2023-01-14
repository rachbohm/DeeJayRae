'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');

const commentSeeds = [
  {
    userId: 1,
      songId: 1,
    body: "Love listening to this while out for a walk in the woods."
  },
  {
    userId: 2,
    songId: 1,
    body: "One of my favorite songs for holding a wall sit."
  },
  {
    userId: 2,
    songId: 2,
    body: "Some great lines in this one"
  },
  {
    userId: 1,
    songId: 3,
    body: "One hit wonder"
  },
  {
    userId: 2,
    songId: 3,
    body: "Sounds like the Beatles"
  },
  {
    userId: 2,
    songId: 4,
    body: "Makes me want to go practice my kung fu."
  },
]

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    await queryInterface.bulkInsert(options, commentSeeds, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    await queryInterface.bulkDelete(options, commentSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
