'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');

const commentSeeds = [
  {
    userId: 2,
    songId: 1,
    body: "Love listening to this while out for a walk in the woods."
  },
  {
    userId: 3,
    songId: 1,
    body: "One of my favorite songs for holding a wall sit."
  },
  {
    userId: 1,
    songId: 2,
    body: "Some great lines in this one"
  },
  {
    userId: 4,
    songId: 2,
    body: "Amazing melody! Can't stop listening."
  },
  {
    userId: 5,
    songId: 3,
    body: "One hit wonder"
  },
  {
    userId: 1,
    songId: 3,
    body: "Sounds like the Beatles"
  },
  {
    userId: 3,
    songId: 4,
    body: "Makes me want to go practice my kung fu."
  },
  {
    userId: 5,
    songId: 4,
    body: "Incredible rhythm! Perfect for a workout."
  },
  {
    userId: 1,
    songId: 5,
    body: "This song gives me chills every time."
  },
  {
    userId: 4,
    songId: 5,
    body: "Powerful lyrics. I relate to them so much."
  },
  {
    userId: 1,
    songId: 6,
    body: "Such a catchy tune! Can't get it out of my head."
  },
  {
    userId: 4,
    songId: 6,
    body: "I love the guitar solo in this song. Pure genius."
  },
  {
    userId: 3,
    songId: 7,
    body: "A beautiful composition. It brings tears to my eyes."
  },
  {
    userId: 5,
    songId: 7,
    body: "This song takes me on an emotional journey."
  },
  {
    userId: 1,
    songId: 8,
    body: "The vocals in this song are simply mesmerizing."
  },
  {
    userId: 3,
    songId: 8,
    body: "I can't help but sing along every time this song plays."
  },
  {
    userId: 4,
    songId: 9,
    body: "This song has such a calming effect on me. Love it."
  },
  {
    userId: 5,
    songId: 9,
    body: "Perfect for a lazy Sunday afternoon. So soothing."
  },
  {
    userId: 1,
    songId: 10,
    body: "The lyrics in this song resonate with me deeply."
  },
  {
    userId: 3,
    songId: 10,
    body: "I get lost in the music every time I listen to this."
  },
  {
    userId: 3,
    songId: 11,
    body: "This song takes me on an emotional journey. Love it!"
  },
  {
    userId: 4,
    songId: 11,
    body: "The melody is so soothing. Can't get enough of it."
  },
  {
    userId: 1,
    songId: 12,
    body: "This track gets stuck in my head in the best way possible."
  },
  {
    userId: 2,
    songId: 12,
    body: "The lyrics are thought-provoking. I find myself reflecting on them."
  },
  {
    userId: 1,
    songId: 13,
    body: "I can't help but dance whenever this song comes on!"
  },
  {
    userId: 4,
    songId: 13,
    body: "This track always puts a smile on my face. So energetic!"
  },
  {
    userId: 1,
    songId: 14,
    body: "The guitar solo in this song is mind-blowing. Pure talent!"
  },
  {
    userId: 2,
    songId: 14,
    body: "The lyrics resonate with me. Such a powerful message."
  },
  {
    userId: 1,
    songId: 15,
    body: "This song gives me goosebumps every time I listen to it."
  },
  {
    userId: 4,
    songId: 15,
    body: "The vocals are so soulful. I get lost in the music."
  },
  {
    userId: 1,
    songId: 16,
    body: "I love the energy of this track. Gets me pumped up!"
  },
  {
    userId: 2,
    songId: 16,
    body: "The lyrics are relatable. They speak to my experiences."
  },
  {
    userId: 1,
    songId: 17,
    body: "This song has a catchy chorus. I find myself singing along."
  },
  {
    userId: 5,
    songId: 17,
    body: "The instrumental arrangement in this song is impressive. So many layers!"
  },
  {
    userId: 2,
    songId: 17,
    body: "I can't get enough of this track. It's on repeat!"
  },

  // Comments for song with songId: 18
  {
    userId: 2,
    songId: 18,
    body: "The harmonies in this song are breathtaking. Perfectly blended."
  },
  {
    userId: 1,
    songId: 18,
    body: "The lyrics hit me right in the feels. Such raw emotions."
  },

  // Comments for song with songId: 19
  {
    userId: 4,
    songId: 19,
    body: "This song has a nostalgic vibe. Reminds me of good times."
  },
  {
    userId: 5,
    songId: 19,
    body: "The production quality on this track is top-notch. Impressive work!"
  },

  // Comments for song with songId: 20
  {
    userId: 1,
    songId: 20,
    body: "This song is perfect for road trips. I can't help but sing along!"
  },
  {
    userId: 2,
    songId: 20,
    body: "The melody is so catchy. It's stuck in my head!"
  },

  // Comments for song with songId: 21
  {
    userId: 1,
    songId: 21,
    body: "The guitar riffs in this song are mind-blowing. So skillful!"
  },
  {
    userId: 4,
    songId: 21,
    body: "I love the energy of this track. It gets me pumped up!"
  },

  // Comments for song with songId: 22
  {
    userId: 5,
    songId: 22,
    body: "This song has a beautiful melody. It's like a breath of fresh air."
  },
  {
    userId: 1,
    songId: 22,
    body: "The lyrics are poetic and profound. I'm moved by them."
  },

  // Comments for song with songId: 23
  {
    userId: 2,
    songId: 23,
    body: "The vocals in this song are so powerful. They give me goosebumps."
  },
  {
    userId: 3,
    songId: 23,
    body: "This track is perfect for chilling out and relaxing. So calming."
  },

  // Comments for song with songId: 24
  {
    userId: 3,
    songId: 24,
    body: "I love the lyrics in this song. They resonate with my experiences."
  },
  {
    userId: 5,
    songId: 24,
    body: "The instrumental composition is stunning. It takes me on a journey."
  },
  {
    userId: 1,
    songId: 25,
    body: "These lyrics are so relatable, they speak to my soul... and my cat's too!"
    },
    {
    userId: 2,
    songId: 25,
    body: "Wow, this instrumental composition is like a rollercoaster ride for my eardrums!"
    },
    {
    userId: 3,
    songId: 26,
    body: "These lyrics hit me right in the funny bone... and I can't stop giggling!"
    },
    {
    userId: 4,
    songId: 26,
    body: "The instrumental composition is so mind-blowing, it's like a party in my headphones!"
    },
    {
    userId: 1,
    songId: 27,
    body: "These lyrics are pure gold... I want to print them on a t-shirt and wear them everywhere!"
    },
    {
    userId: 4,
    songId: 27,
    body: "The instrumental composition is like a magic carpet ride... I'm floating in musical bliss!"
    }
];


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    await queryInterface.bulkInsert(options, commentSeeds, {})
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
    options.tableName = 'Comments';
    await queryInterface.bulkDelete(options, commentSeeds, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
