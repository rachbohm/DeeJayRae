'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
const songSeeds = [
  {
    userId: 1,
    albumId: 1,
    title: 'My First Song',
    description: 'amateur but fun',
    previewImage: 'https://images.squarespace-cdn.com/content/v1/5d05221ec14ff000014e4fea/1568759626270-27MI0R53HIBRM33YRCHB/That+First+Song+Logo-blue-mid.png',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Reservoir',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Chasing Antares',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Sweet Kiss',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Reflection',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Pellucidity',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Gajumaru',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Destiny',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Dust Moves Again',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Canaan',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Kyo',
    description: 'meditative',
    previewImage: 'https://f4.bcbits.com/img/a0050101651_10.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Bangs',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Cyclops Rock',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "Man, It's so Loud in Here",
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Mr. Xcitement',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Another First Kiss',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "I've Got a Fang",
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Hovering Sombrero',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Yeh Yeh',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Hopeless Bleak Despair',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Drink!',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'My Man',
    description: 'thought-provoking',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/cb/TheyMightBeGiantsMinkCar.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 4,
    albumId: 4,
    title: 'Get The Funk Out',
    description: 'peaceful love song',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/25/More_than_words.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 4,
    albumId: 4,
    title: 'More Than Words',
    description: 'peaceful love song',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/25/More_than_words.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 4,
    albumId: 4,
    title: 'Money(In God We Trust)',
    description: 'peaceful love song',
    previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/25/More_than_words.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Glory of Love',
    description: 'strong and powerful',
    previewImage: 'https://lastfm.freetls.fastly.net/i/u/500x500/17c0d7fda8e9d8e7b1f7f6094b45980a.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Only Love Knows Why',
    description: 'strong and powerful',
    previewImage: 'https://lastfm.freetls.fastly.net/i/u/500x500/17c0d7fda8e9d8e7b1f7f6094b45980a.jpg',
    audioFile: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
//27 songs
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
