const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const asyncHandler = require('express-async-handler');
const newError = require('../../utils/newError');
const router = express.Router();

// edit a song
router.put('/:songId', singleMulterUpload("audioFile"),
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { songId } = req.params;
    const { title, description, imageUrl } = req.body;
    const userId = req.user.id;
    let audioFile = null;

    if (req.file) {
      audioFile = await singlePublicFileUpload(req.file);
    }

    const targetSong = await Song.findByPk(songId);

    if (!targetSong) {
      const err = new Error("Song not found")
      err.status = 404;
      err.errors = ["Song couldn't be found"];
      return next(err)
    }

    if (targetSong.userId === userId) {
      targetSong.title = title;
      targetSong.description = description;

      if (audioFile) {
        // Update audioFile only if it exists
        targetSong.audioFile = audioFile;
      }

      targetSong.previewImage = imageUrl;
      await targetSong.save();

      const resSong = await Song.findByPk(targetSong.id, {
        include: [
          {
            model: User,
            as: 'Artist',
          },
          {
            model: Album,
            attributes: {
              exclude: [
                "userId",
                "description",
                "createdAt",
                "updatedAt"
              ]
            }
          }
        ]
      });

      return res.json(
        resSong
      );
    } else {
      const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
        'Current user is unauthorized'
      ])
      return next(err);
    }
  })
);


//get all comments by song id
router.get('/:songId/comments', async (req, res, next) => {
  const songId = req.params.songId;

  const comments = await Comment.findAll({
    where: {
      songId
    },
    include: [
      {
        model: User,
      }
    ]
  });

  if (!comments.length) {
    const err = new Error("Song couldn't be found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  }

  res.json({ Comments: comments })
});
//get all songs created by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const songs = await Song.findAll({
    where: {
      userId: user.id
    }
  });
  return res.json(songs)
});
//get details of a song based on song id
router.get('/:songId', async (req, res, next) => {
  const songId = req.params.songId;
  const song = await Song.findByPk(songId, {
    include: [
      {
        model: User,
        as: 'Artist',
      },
      {
        model: Album,
        attributes: {
          exclude: [
            "userId",
            "description",
            "createdAt",
            "updatedAt"
          ]
        }
      }
    ]
  });
  if (!song) {
    const err = new Error("Song not found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  }
  return res.json(song)
});

//get all songs
const validateQueryParams = [
  check('page')
    .optional().isInt({ gt: -1 })
    .withMessage('Page must be greater than or equal to 0'),
  check('size')
    .optional().isInt({ gt: -1 })
    .withMessage('Size must be greater than or equal to 0'),
  // check('createdAt')
  //   .optional().isISO8601({})
  //   .withMessage('createdAt is invalid'),
  handleValidationErrors
];
router.get('/', validateQueryParams, async (req, res) => {

  let page = parseInt(req.query.page) || 0;
  let size = parseInt(req.query.size) || 20;

  const pagination = {};
  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  const songs = await Song.findAll({
    // ...pagination
    include: {
      model: User, as: "Artist"
    }
  });
  res.json({ Songs: songs, page, size })
});

//create a comment for a song based on song id

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Comment body text is required'),
  handleValidationErrors
];

router.post('/:songId/comments', requireAuth, validateComment, async (req, res, next) => {
  const songId = req.params.songId;
  const { body } = req.body;
  const { user } = req;

  const targetSong = await Song.findByPk(songId);

  if (!targetSong) {
    const err = new Error("Song couldn't be found")
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  };

  const newComment = await Comment.create({
    body,
    userId: user.id,
    songId
  });

  targetSong.addComment(newComment);


  const resComment = await Comment.findByPk(newComment.id, {
    include: [
      {
        model: User,
      }
    ]
  });
  res.json(resComment);
});


//create a song for an album based on album id
const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Title is required'),
  check('url')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Song URL is required'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('albumId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Album ID is required'),
  check('imageUrl')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Image URL is required'),
  handleValidationErrors
];

router.post('/', singleMulterUpload("audioFile"),
  requireAuth,
  validateSong,
  asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { title, description, imageUrl, albumId } = req.body;
    // console.log("~~~~~~~~~~~~~~~~~~~~req.file received in backend", req.file);
    let audioFile = await singlePublicFileUpload(req.file);
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
      previewImage: imageUrl,
      albumId,
      audioFile
    });

    // console.log("~~~~~~~~~~~~~~~~~~~~newSong", newSong)

    return res.json({
      newSong
    });
  })
);

//delete a song
router.delete('/:songId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const { songId } = req.params;

  const doomedSong = await Song.findByPk(songId);

  if (!doomedSong) {
    const err = new Error("Song couldn't be found");
    err.status = 404;
    err.errors = ["Song couldn't be found"];
    return next(err)
  }

  if (doomedSong.userId === user.id) {
    await doomedSong.destroy();

    res.json({
      message: "Successfully deleted",
      statusCode: res.statusCode
    })
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ])
    return next(err);
  }
})

module.exports = router;
