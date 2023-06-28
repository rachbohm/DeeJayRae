const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const asyncHandler = require('express-async-handler');
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
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    let profileImageUrl = "https://storroom.com/wp-content/uploads/2019/02/default-user.png"
    if (req.file) {
      profileImageUrl = await singlePublicFileUpload(req.file);
    }

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
      return next(err);
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

    const user = await User.signup({
      email,
      username,
      password,
      firstName,
      lastName,
      profileImageUrl
    });

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token;
    return res.json({
      user
    });
  })
);

//edit a user profile picture
router.put('/:userId', singleMulterUpload("image"),
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    let profileImageUrl = await singlePublicFileUpload(req.file);

    const targetUser = await User.findByPk(userId);

    if (!targetUser) {
      const err = new Error("User not found")
      err.status = 404;
      err.errors = ["User couldn't be found"];
      return next(err)
    }

    if (targetUser.id === req.user.id) {

        targetUser.profileImageUrl = profileImageUrl;

      await targetUser.save();

      return res.json(targetUser);
    } else {
      const err = new Error("Unauthorized")
      err.status = 401;
      err.errors = ["Unauthorized"];
      return next(err)
    }
  })
);

//get all playlists of an artist from an id
router.get('/:artistId/playlists', async (req, res, next) => {
  const artistId = req.params.artistId;
  const artistPlaylists = await Playlist.findAll({
    where: {
      userId: artistId
    }
  });
  if (!artistPlaylists.length) {
    const err = new Error("Artist couldn't be found");
    err.status = 404;
    err.errors = ["Artist couldn't be found"];
    return next(err)
  }
  res.json({Playlists: artistPlaylists})
});

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
    err.errors = ["Artist couldn't be found"];
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
