const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
  .withMessage('Last Name is required'),
  handleValidationErrors
];
//sign up a user
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;

    const emailExists = await User.findAll({
      where: {
        email
      }
    });

    if (emailExists.length) {
      const err = newError(403,
        "User already exists",
        "A user with the provided email address already exists",
        ["A user with the provided email address already exists"]);
      next(err);
    };

    const usernameExists = await User.findAll({
      where: {
        username
      }
    });

    if (usernameExists.length) {
      const err = newError(403,
        "User already exists",
        "A user with the provided username already exists",
        ["A user with the provided username already exists"]);
       return next(err);
    }

    const user = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token;

    return res.json(
      user
    );
  }
);

//get all songs of an artist from an id
router.get('/:artistId/songs', async (req, res, next) => {
  const artistId = req.params.artistId;

  const artistSongs = await Song.findAll({
    where: {
      userId: artistId
    }
  });

  if (!artistSongs.length) {
    const err = new Error("Artist couldn't be found");
    err.status = 404;
    err.errors = ["Artists couldn't be found"];
    return next(err)
  }

  res.json({ Songs: artistSongs })
});

//get details of an artist from an id
router.get('/:artistId', async (req, res, next) => {
  const userId = req.params.artistId;

  const userDetails = await User.findOne({
    where: {
      id: userId
    },
    attributes: {
      include: [
          "id",
          "username",
        "previewImage"
      ],
      exclude: ["hashedPassword", "email", "createdAt", "updatedAt", "firstName", "lastName"]
    },
    include: [
      {
        model: Song,
        attributes: {
          include: ["id", "previewImage"],
          exclude: ["userId", "albumId", "title", "description", "url", "createdAt", "updatedAt"]
        }
      },
      {
        model: Album,
        attributes: {
          include: ["id", "previewImage"],
          exclude: ["userId", "title", "description", "createdAt", "updatedAt"]
        }
      }
    ]
  });

  if (!userDetails) {
    const err = new Error("Artist couldn't be found");
    err.status = 404;
    err.errors = ["Artist couldn't be found"]
    return next(err)
  }

  const totalSongs = await Song.count({
    where: {
      userId
    }
  });

  const totalAlbums = await Album.count({
    where: {
      userId
    }
  });

  userDetails.dataValues.totalSongs = totalSongs;
  userDetails.dataValues.totalAlbums = totalAlbums;


  return res.json(userDetails);

});

module.exports = router;
