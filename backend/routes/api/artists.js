const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/:userId/albums', async (req, res, next) => {
  const userId = req.params.userId;
  const artistAlbums = await Album.findAll({
    where: {
      userId: userId
    }
  });

  const userExists = await User.findByPk(userId)
  if (!userExists) {
    const err = new Error("User not found");
    err.status = 404;
    err.errors = ["User does not exist with the specified artist id"];
    return next(err)
  }

  res.json({Albums: artistAlbums})
});











module.exports = router;
