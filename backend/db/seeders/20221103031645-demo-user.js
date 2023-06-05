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
        profileImageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
      },
      {
        email: 'user1@user.io',
        username: 'PellucidMoments',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "Pellucidity",
        lastName: "The Band",
        profileImageUrl: "pretty@pic.com"
      },
      {
        email: 'user2@user.io',
        username: 'TMBG',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'They Might',
        lastName: "Be Giants",
        profileImageUrl: "pretty@pic.com"
      },
      {
        email: 'user3@user.io',
        username: 'ExtremelyGreat',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Extreme',
        lastName: "The Band",
        profileImageUrl: "pretty@pic.com"
      },
      {
        email: 'user4@user.io',
        username: 'TheCetty',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Peter',
        lastName: "Cetera",
        profileImageUrl: "pretty@pic.com"
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
