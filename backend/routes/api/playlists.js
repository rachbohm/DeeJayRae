const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError');
const router = express.Router();

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
})

module.exports = router;
