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
    title: 'Where Do the Children Play?',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/01.+Cat+Stevens+-+Where+Do+the+Children+Play__sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Hard Headed Woman',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/02.+Cat+Stevens+-+Hard+Headed+Woman_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Wild World',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/03.+Cat+Stevens+-+Wild+World_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Sad Lisa',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/04.+Cat+Stevens+-+Sad+Lisa_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Miles From Nowhere',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/05.+Cat+Stevens+-+Miles+From+Nowhere_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'But I Might Die Tonight',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/06.+Cat+Stevens+-+But+I+Might+Die+Tonight_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Longer Boats',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/07.+Cat+Stevens+-+Longer+Boats_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Into White',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/08.+Cat+Stevens+-+Into+White_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'On The Road to Find Out',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/09.+Cat+Stevens+-+On+the+Road+to+Find+Out_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Father and Son',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/10.+Cat+Stevens+-+Father+and+Son_sample.mp3'
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Tea For the Tillerman',
    description: 'meditative',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/tea-for-tillerman-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/11.+Cat+Stevens+-+Tea+for+the+Tillerman_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Everything Right Is Wrong Again',
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/01.+They+Might+Be+Giants+-+Everything+Right+Is+Wrong+Again_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Put Your Hand Inside the Puppet Head',
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/02.+They+Might+Be+Giants+-+Put+Your+Hand+Inside+the+Puppet+Head_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "Number Three",
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/03.+They+Might+Be+Giants+-+Number+Three_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "Don't Let's Start",
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/04.+They+Might+Be+Giants+-+Don't+Let's+Start_sample.mp3"
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Hide Away Folk Family',
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/05.+They+Might+Be+Giants+-+Hide+Away+Folk+Family_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "Footsteps",
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/06.+They+Might+Be+Giants+-+32+Footsteps_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Toddler Hiway',
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/07.+They+Might+Be+Giants+-+Toddler+Hiway_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Rabid Child',
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/08.+They+Might+Be+Giants+-+Rabid+Child_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "Nothing's Gonna Change My Clothes",
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/09.+They+Might+Be+Giants+-+Nothing's+Gonna+Change+My+Clothes_sample.mp3"
  },
  {
    userId: 3,
    albumId: 3,
    title: '(She Was A) Hotel Detective',
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/10.+They+Might+Be+Giants+-+(She+Was+a)+Hotel+Detective_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "She's An Angel",
    description: 'thought-provoking',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/11.+They+Might+Be+Giants+-+She's+an+Angel_sample.mp3"
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Youth Culture Killed My Dog',
    description: 'peaceful love song',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/12.+They+Might+Be+Giants+-+Youth+Culture+Killed+My+Dog_sample.mp3"
  },
  {
    userId: 3,
    albumId: 3,
    title: 'Boat of Car',
    description: 'peaceful love song',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/13.+They+Might+Be+Giants+-+Boat+of+Car_sample.mp3'
  },
  {
    userId: 3,
    albumId: 3,
    title: "Absolutely Bill's Mood",
    description: 'peaceful love song',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/14.+They+Might+Be+Giants+-+Absolutely+Bill's+Mood_sample.mp3"
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Big Mistake',
    description: 'strong and powerful',
    previewImage: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/tmbg-image.jpeg",
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/01.+Peter+Cetera+-+Big+Mistake_sample.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: "They Don't Make 'Em Like They Used To",
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/02.+Peter+Cetera+-+They+Don't+Make+'Em+Like+They+Used+To_sample.mp3"
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Glory of Love',
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/03.+Peter+Cetera+-+Glory+Of+Love_sample.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Queen Of the Masquerade Ball',
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/04.+Peter+Cetera+-+Queen+Of+The+Masquerade+Ball_sample.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: "Daddy's Girl",
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: "https://rachelsongbucket.s3.us-east-2.amazonaws.com/05.+Peter+Cetera+-+Daddy's+Girl_sample.mp3"
  },
  {
    userId: 5,
    albumId: 5,
    title: 'The Next Time I Fall',
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/06.+Peter+Cetera+-+The+Next+Time+I+Fall_sample.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Wake Up To Love',
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/07.+Peter+Cetera+-+Wake+Up+To+Love_sample.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Solitude / Solitaire',
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/08.+Peter+Cetera+-+Solitude+-+Solitaire_sample.mp3'
  },
  {
    userId: 5,
    albumId: 5,
    title: 'Only Love Knows Why',
    description: 'strong and powerful',
    previewImage: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/peter-cetera-image.jpeg',
    audioFile: 'https://rachelsongbucket.s3.us-east-2.amazonaws.com/09.+Peter+Cetera+-+Only+Love+Knows+Why_sample.mp3'
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
