'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
const playlistSeeds = [
  {
    userId: 1,
    name: 'G/JMaru',
    previewImage: 'fake@url.com'
  },
  {
    userId: 2,
    name: 'R/Voir',
    previewImage: 'anotherfake@url.com'
  }
]

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    await queryInterface.bulkInsert(options, playlistSeeds, {})
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
    optins.tableName = 'Playlists';
    await queryInterface.bulkDelete(options, playlistSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
