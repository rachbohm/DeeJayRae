const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError');
const router = express.Router();

//get all albums created by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const userAlbums = await Album.findAll({
    where: {
      userId: user.id
    }
  });
  return res.json({Albums: userAlbums})
});

//get details of an album from an id
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
//get all albums
router.get('/', async (req, res) => {
  const allAlbums = await Album.findAll();
  res.json({Albums: allAlbums})
})
//create an album
router.post('/', requireAuth, async (req, res, next) => {
  const { user } = req;

  const { title, description, imageUrl } = req.body;

  if (!title) {
    const err = newError(400,
      "Album title is required",
      "Validation error",
      ["Album title is required"]);
    return next(err);
  }

  const newAlbum = await Album.create({
    userId: user.id,
    title,
    description,
    previewImage: imageUrl
  })

  res.json(newAlbum)
});
//edit an album
const albumValidate = [
  check('title')
    .notEmpty()
    .exists({checkFalsy: true})
  .withMessage('Album title is required'),
  handleValidationErrors
];

//edit an album
router.put('/:albumId', albumValidate, requireAuth, async (req, res, next) => {
  const albumId = req.params.albumId;
  const { title, description, imageUrl } = req.body;
  const { user } = req;

  const targetAlbum = await Album.findByPk(albumId);

  if (!targetAlbum) {
    const err = new Error("Album not found");
    err.status = 404;
    err.errors = ["Album does not exist with the specified id"];
     next(err)
  }

  if (targetAlbum.userId === user.id) {

    targetAlbum.title = title;
    targetAlbum.description = description;
    targetAlbum.previewImage = imageUrl;
    res.json(targetAlbum)
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ])
    next(err);
  }
});


module.exports = router;
