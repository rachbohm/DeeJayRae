const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.put('/:songId', requireAuth, async (req, res, next) => {
  const { songId } = req.params;
  const { title, description, url, imageUrl } = req.body;
  const targetSong = await Song.findByPk(songId);

  if (!targetSong) {
    const err = new Error("Song not found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  }

  targetSong.title = title;
  targetSong.description = description;
  targetSong.url = url;
  targetSong.previewImage = imageUrl;

  return res.json(targetSong);
})

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const songs = await Song.findAll({
    where: {
      userId: user.id
    }
  });
  return res.json(songs)
});

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


router.get('/', async (req, res) => {
  const songs = await Song.findAll();
  res.json({ Songs: songs })
});

router.post('/:songId/comments', requireAuth, async (req, res, next) => {
  const songId = req.params.songId;
  const {body} = req.body;
  const { user } = req;

  const targetSong = await Song.findByPk(songId);

  if (!targetSong) {
    const err = new Error("Song not found")
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


router.post('/', async (req, res, next) => {
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


module.exports = router;
