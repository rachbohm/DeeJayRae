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
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', playlistSeeds, {})
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
    await queryInterface.bulkDelete('Playlists', playlistSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
