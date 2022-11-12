const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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

  res.json( newAlbum )
})

module.exports = router;
