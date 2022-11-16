const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError');
const router = express.Router();

//edit a comment

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Comment body text is required'),
  handleValidationErrors
];

router.put('/:commentId', requireAuth, validateComment, async (req, res, next) => {
  const commentId = req.params.commentId;
  const { body } = req.body;
  const userId = req.user.id;

  const targetComment = await Comment.findByPk(commentId);

  if (!targetComment) {
    const err = new Error("Comment couldn't be found");
    err.status = 404;
    err.errors = ["Comment does not exist with the specified comment id"];
    next(err)
  };

  if (targetComment.userId === userId) {

    targetComment.body = body;
    res.json(targetComment);
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ])
    next(err);
  }
});

//delete a comment
router.delete('/:commentId', requireAuth, async (req, res, next) => {
  const commentId = req.params.commentId;
  const { user } = req;

  const doomedComment = await Comment.findByPk(commentId);

  if (!doomedComment) {
    const err = new Error("Comment couldn't be found");
    err.status = 404;
    err.errors = ["Comment does not exist with the specified comment id"];
     next(err)
  };

  if (doomedComment.userId == user.id) {
    await doomedComment.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode
  })
  } else {
    const err = newError(403, 'Unauthorized', 'Current user is unauthorized', [
      'Current user is unauthorized'
    ])
    next(err);
  }
})

module.exports = router;
