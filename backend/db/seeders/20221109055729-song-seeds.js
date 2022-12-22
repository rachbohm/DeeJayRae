'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
const songSeeds = [
  {
    userId: 1,
    albumId: 1,
    title: 'Gajumaru',
    description: 'meditative',
    url: 'fake@url.com',
    previewImage: 'fake@url.com'
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Reservoir',
    description: 'meditative',
    url: 'fake@url.com',
    previewImage: 'fake@url.com'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Jagumaru',
    description: 'upsetting',
    url: 'url@url.com',
    previewImage: 'url@url.com'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Veserroir',
    description: 'upsetting',
    url: 'url@url.com',
    previewImage: 'url@url.com'
  }
]

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Songs';
    await queryInterface.bulkInsert(options, songSeeds, {})
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
    options.tableName = 'Songs';
    await queryInterface.bulkDelete(options, songSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
