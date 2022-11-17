'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');

const albumSeeds = [
  {
  userId: 1,
  title: 'Pellucidity',
  description: 'mellow and acoustic',
    previewImage: 'fake@url.com'
},
{
  userId: 2,
  title: 'Pellucididoink',
  description: 'shmellow and shmacoustic',
    previewImage: 'fack@url.com'
}

]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Albums', albumSeeds, {})
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
    await queryInterface.bulkDelete('Albums', albumSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
