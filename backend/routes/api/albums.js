const express = require('express');
const { User, Album } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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
