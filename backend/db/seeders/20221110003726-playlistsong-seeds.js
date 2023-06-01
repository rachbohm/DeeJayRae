'use strict';
const { PlaylistSong } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in the options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const playlistCount = 5; // Number of playlists
    const songCount = 27; // Number of songs
    const songsPerPlaylist = 10; // Number of songs to assign to each playlist

    const playlistSongSeeds = [];

    // Generate random playlist-song associations
    for (let playlistId = 1; playlistId <= playlistCount; playlistId++) {
      const assignedSongs = new Set(); // Track assigned songs to avoid duplicates

      while (assignedSongs.size < songsPerPlaylist) {
        const songId = Math.floor(Math.random() * songCount) + 1; // Generate random song ID

        // Check if the song is already assigned to the playlist
        if (!assignedSongs.has(songId)) {
          assignedSongs.add(songId);

          // Create the playlist-song seed object
          const playlistSongSeed = {
            playlistId,
            songId
          };

          playlistSongSeeds.push(playlistSongSeed);
        }
      }
    }

    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkInsert(options, playlistSongSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    await queryInterface.bulkDelete(options, null, {});
  },
};
