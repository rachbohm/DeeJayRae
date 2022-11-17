'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');

const commentSeeds = [
  {
    userId: 1,
      songId: 1,
    body: "I like this song"
  },
  {
    userId: 2,
    songId: 3,
    body: "I hate this song"
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', commentSeeds, {})
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
    await queryInterface.bulkDelete('Comments', commentSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
