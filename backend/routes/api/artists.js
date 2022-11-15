const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//get all albums of an artist from an id
router.get('/:artistId/albums', async (req, res, next) => {
  const userId = req.params.artistId;
  const artistAlbums = await Album.findAll({
    where: {
      userId: userId
    }
  });

  const userExists = await User.findByPk(userId)
  if (!userExists) {
    const err = new Error("Artist couldn't be found");
    err.status = 404;
    err.errors = ["Artist couldn't be found"];
    return next(err)
  }

  res.json({Albums: artistAlbums})
});











module.exports = router;
