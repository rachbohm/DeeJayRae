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
];

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkInsert(options, playlistSongSeeds, {})
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
    options.tableName = 'PlaylistSongs'
    await queryInterface.bulkDelete(options, playlistSongSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
