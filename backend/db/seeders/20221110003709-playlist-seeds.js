'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
const playlistSeeds = [
  {
    userId: 1,
    name: 'My Very First Playlist',
    previewImage: 'https://srv.latostadora.com/image/music_-_my_first_playlist_-_my_first--id:b28036a5-5f36-4989-95e9-84f0accd1a10;s:H_A1;b:f2f2f2;w:334;f:f;i:1356231886449135623201709261.jpg'
  },
  {
    userId: 2,
    name: 'Study Jamz',
    previewImage: 'https://news.virginia.edu/sites/default/files/Header_Outsmart_Brain_AA.jpg'
  },
  {
    userId: 3,
    name: 'Coding Jamz',
    previewImage: 'https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg'
  },
  {
    userId: 4,
    name: 'Rainy Day',
    previewImage: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?cs=srgb&dl=pexels-bibhukalyan-acharya-1463530.jpg&fm=jpg'
  },
  {
    userId: 5,
    name: 'Coffee Shop',
    previewImage: 'https://www.barniescoffee.com/cdn/shop/articles/bar-1869656_1920_480x540_crop_center.jpg?v=1660683986'
  },
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
