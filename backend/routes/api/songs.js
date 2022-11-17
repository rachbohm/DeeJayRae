const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError');
const router = express.Router();

//edit a song
router.put('/:songId', requireAuth, async (req, res, next) => {
  const { songId } = req.params;
  const { title, description, url, imageUrl } = req.body;
  const userId = req.user.id;

  const targetSong = await Song.findByPk(songId);

  if (!targetSong) {
    const err = new Error("Song not found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  }

  if (targetSong.userId === userId) {
    targetSong.title = title;
    targetSong.description = description;
    targetSong.url = url;
    targetSong.previewImage = imageUrl;

    return res.json(targetSong);
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ])
    return next(err);
  }
})

//get all comments by song id
router.get('/:songId/comments', async (req, res, next) => {
  const songId = req.params.songId;

  const comments = await Comment.findAll({
    where: {
      songId
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "email",
            "hashedPassword",
            "firstName",
            "lastName",
            "createdAt",
            "updatedAt",
            "previewImage"
          ]
        }
      }
    ]
  });

  if (!comments.length) {
    const err = new Error("Song couldn't be found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
     return next(err)
  }

  res.json({Comments: comments})
});
//get all songs created by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const songs = await Song.findAll({
    where: {
      userId: user.id
    }
  });
  return res.json(songs)
});
//get details of a song based on song id
router.get('/:songId', async (req, res, next) => {
  const songId = req.params.songId;
  const song = await Song.findByPk(songId, {
    include: [
      {
        model: User,

        attributes: {
          exclude: [
            "email",
            "hashedPassword",
            "firstName",
            "lastName",
            "createdAt",
            "updatedAt"
          ]
        },
        as: 'Artist',
      },
      {
        model: Album,
        attributes: {
          exclude: [
            "userId",
            "description",
            "createdAt",
            "updatedAt"
          ]
        }
      }
    ]
  });
  if (!song) {
    const err = new Error("Song not found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  }
  return res.json(song)
});

//get all songs
router.get('/', async (req, res) => {
  const songs = await Song.findAll();
  res.json({ Songs: songs })
});

//create a comment for a song based on song id

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Comment body text is required'),
  handleValidationErrors
];

router.post('/:songId/comments', requireAuth, validateComment, async (req, res, next) => {
  const songId = req.params.songId;
  const { body } = req.body;
  const { user } = req;

  const targetSong = await Song.findByPk(songId);

  if (!targetSong) {
    const err = new Error("Song couldn't be found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  };

  const newComment = await Comment.create({
    body,
    userId: user.id,
    songId
  });

  targetSong.addComment(newComment);
  res.json(newComment);
});


//create a song for an album based on album id
router.post('/', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { title, description, url, imageUrl, albumId } = req.body;

  const albumExists = await Album.findByPk(albumId);

  if (!albumExists) {
    const err = new Error("Album id does not exist");
    err.errors = [
      "Album does not exist with the provided id"
    ]
    err.status = 404;
    return next(err)
  };

  const newSong = await Song.create({
    userId: user.id,
    title,
    description,
    url,
    previewImage: imageUrl,
    albumId
  });

  return res.json(
    newSong
  );
});
//delete a song
router.delete('/:songId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { songId } = req.params;

  const doomedSong = await Song.findByPk(songId);

  if (!doomedSong) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    err.errors = ["Song couldn't be found"];
     return next(err)
  }

  if (doomedSong.userId === user.id) {
    await doomedSong.destroy();

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
