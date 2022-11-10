'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
/** @type {import('sequelize-cli').Migration} */

const playlistSongSeeds = [
  {
    playlistId: 1,
    songId: 1
  },
  {
    playlistId: 1,
    songId: 3
  },
  {
    playlistId: 2,
    songId: 2
  },
  {
    playlistId: 2,
    songId: 4
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PlaylistSongs', playlistSongSeeds, {})
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
    await queryInterface.bulkDelete('PlaylistSongs', playlistSongSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
