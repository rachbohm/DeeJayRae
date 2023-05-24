'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Demo",
        lastName: "User",
        previewImage: "pretty@pic.com"
      },
      {
        email: 'user1@user.io',
        username: 'PellucidMoments',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "Pellucidity",
        lastName: "The Band",
        previewImage: "pretty@pic.com"
      },
      {
        email: 'user2@user.io',
        username: 'TMBG',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'They Might',
        lastName: "Be Giants",
        previewImage: "pretty@pic.com"
      },
      {
        email: 'user3@user.io',
        username: 'ExtremelyGreat',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Extreme',
        lastName: "The Band",
        previewImage: "pretty@pic.com"
      },
      {
        email: 'user4@user.io',
        username: 'TheCetty',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Peter',
        lastName: "Cetera",
        previewImage: "pretty@pic.com"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
