'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
const songSeeds = [
  {
    userId: 1,
    albumId: 1,
    title: 'Gajumaru',
    description: 'meditative',
    url: 'fakeurl.com',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg'
  },
  {
    userId: 1,
    albumId: 2,
    title: 'My Man',
    description: 'thought-provoking',
    url: 'fakeurl.com',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg'
  },
  {
    userId: 2,
    albumId: 3,
    title: 'More Than Words',
    description: 'peaceful love song',
    url: 'url.com',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/25/More_than_words.jpg'
  },
  {
    userId: 2,
    albumId: 4,
    title: 'Glory of Love',
    description: 'strong and powerful',
    url: 'url.com',
    previewImage: 'https://lastfm.freetls.fastly.net/i/u/500x500/17c0d7fda8e9d8e7b1f7f6094b45980a.jpg'
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
