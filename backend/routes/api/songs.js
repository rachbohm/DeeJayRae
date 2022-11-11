const express = require('express');
const { User, Song, Album } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res) => {
  const songs = await Song.findAll();
  res.json({ Songs: songs })
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
})

module.exports = router;
