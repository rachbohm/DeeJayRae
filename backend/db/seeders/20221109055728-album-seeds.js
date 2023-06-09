'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');

const albumSeeds = [
  {
    userId: 1,
    title: 'My First Album',
    description: "It came out pretty good for a first album",
    previewImage: 'fakeurl.com'
  },
  {
    userId: 2,
    title: 'Tea For the Tillerman',
    description: 'mellow and acoustic',
    previewImage: 'fakeurl.com'
  },
  {
    userId: 3,
    title: 'They Might Be Giants (album)',
    description: 'quirky rock',
    previewImage: 'fake.com'
  },
  {
    userId: 4,
    title: 'Extreme II',
    description: 'soft rock',
    previewImage: 'fake.com'
  },
  {
    userId: 5,
    title: 'Solitude/Solitaire',
    description: 'strong rock',
    previewImage: 'fake.com'
  }
];

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Albums'
    await queryInterface.bulkInsert(options, albumSeeds, {})
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
    options.tableName = 'Albums'
    await queryInterface.bulkDelete(options, albumSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
