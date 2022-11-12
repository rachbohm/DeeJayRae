const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/:albumId', async (req, res, next) => {
  const albumId = req.params.albumId;
  const targetAlbum = await Album.findAll({
    where: {
      id: albumId
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
              "updatedAt"
            ]
          },
          as: 'Artist',
        },
        {
          model: Song
        }
      ]
  });
  if (!targetAlbum.length) {
    const err = new Error("Album not found")
    err.status = 404;
    err.errors = ["Album couldn't be found"];
    return next(err)
  }
res.json(targetAlbum)
})

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const userAlbums = await Album.findAll({
    where: {
      userId: user.id
    }
  });
  return res.json({Albums: userAlbums})
});

router.get('/', async (req, res) => {
  const allAlbums = await Album.findAll();
  res.json({Albums: allAlbums})
})

router.post('/', async (req, res) => {
  const { user } = req;

  const { title, description, imageUrl } = req.body;

  const newAlbum = await Album.create({
    userId: user.id,
    title,
    description,
    previewImage: imageUrl
  })

  res.json(newAlbum)
});

router.put('/:albumId', async (req, res, next) => {
  const albumId = req.params.albumId;
  const { title, description, imageUrl } = req.body;
  const targetAlbum = await Album.findByPk(albumId);

  if (!targetAlbum) {
    const err = new Error("Album not found");
    err.status = 404;
    err.errors = ["Album does not exist with the specified id"];
    return next(err)
}

  targetAlbum.title = title;
  targetAlbum.description = description;
  targetAlbum.previewImage = imageUrl;
  res.json(targetAlbum);
});


module.exports = router;
