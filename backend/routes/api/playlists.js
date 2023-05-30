const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Playlist, PlaylistSong } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError');
const router = express.Router();

//add a song to a playlist based on the playlist's id
router.post('/:playlistId/songs', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { playlistId } = req.params;
  const { songId } = req.body;

  const targetPlaylist = await Playlist.findOne({
    where: {
      id: playlistId
    }
  });

  if (!targetPlaylist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404;
    err.errors = ["Playlist couldn't be found"];
    return next(err)
  }

  const targetSong = await Song.findByPk(songId);

  if (!targetSong) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  }

  if (targetPlaylist.userId === user.id) {

    await targetPlaylist.addSong(targetSong);

    const playlistSong = await PlaylistSong.findOne({
      where: {
        playlistId,
        songId
      },
      attributes: {
        include: ["id"],
        exclude: ["createdAt", "updatedAt"]
      }
    });
    res.json(playlistSong)
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ])
    return next(err);
  }

});

//create a playlist

const validatePlaylist = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Playlist name is required'),
  handleValidationErrors
]

router.post('/', requireAuth, validatePlaylist, async (req, res, next) => {
  const { name, imageUrl } = req.body;
  const { user } = req;

  const newPlaylist = await Playlist.create({
    name,
    previewImage: imageUrl,
    userId: user.id
  });
  res.json(newPlaylist)
});

//edit a playlist
router.put('/:playlistId', requireAuth, validatePlaylist, async (req, res, next) => {
  const { user } = req;
  const { playlistId } = req.params;
  const { name, imageUrl } = req.body;

  const targetPlaylist = await Playlist.findByPk(playlistId);

  if (!targetPlaylist) {
    const err = new Error("Playlist couldn't be found")
    err.status = 404;
    err.errors = ["Playlist couldn't be found"];
    return next(err)
  };

  if (targetPlaylist.userId === user.id) {

    targetPlaylist.name = name;
    targetPlaylist.previewImage = imageUrl;

    res.json(targetPlaylist)
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ]);
    return next(err)
  }
});

//get all playlists created by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const playlists = await Playlist.findAll({
    where: {
      userId: user.id
    }
  });
  res.json({ Playlists: playlists })
})

//get all playlists
router.get('/', async (req, res, next) => {
  const playlists = await Playlist.findAll({
    include: [
      {
        model: User
      }
    ]
  });
  res.json({ Playlists: playlists })
});


//get details of a playlist from an id
router.get('/:playlistId', async (req, res, next) => {
  const playlistId = req.params.playlistId;

  const playlistDetails = await Playlist.findOne({
    where: {
      id: playlistId
    },
    include: [
      {//include the user who created the playlist
        model: User,
        attributes: ['username']
      },
      {//include the songs in the playlist
        model: Song,
        through: {
          attributes: []
        }
      }
    ]
  });

  if (!playlistDetails) {
    const err = new Error("Playlist couldn't be found")
    err.status = 404;
    err.errors = ["Playlist couldn't be found"];
    return next(err)
  };
  res.json(playlistDetails)
});
//delete a playlist
router.delete('/:playlistId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { playlistId } = req.params;

  const doomedPlaylist = await Playlist.findByPk(playlistId);

  if (!doomedPlaylist) {
    const err = new Error("Playlist couldn't be found");
    err.status = 404;
    err.errors = ["Playlist couldn't be found"];
    return next(err)
  }

  if (doomedPlaylist.userId === user.id) {
    await doomedPlaylist.destroy();

    res.json({
      message: "Successfully deleted",
      statusCode: res.statusCode
    })
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ])
    return next(err);
  }
})

module.exports = router;
