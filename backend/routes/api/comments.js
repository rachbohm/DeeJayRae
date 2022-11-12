const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.put('/:commentId', requireAuth, async (req, res, next) => {
  const commentId = req.params.commentId;
  const {body} = req.body;

  const targetComment = await Comment.findByPk(commentId);

  if (!targetComment) {
    const err = new Error("Comment not found");
    err.status = 404;
    err.errors = ["Comment does not exist with the specified comment id"];
    return next(err)
}

  targetComment.body = body;

res.json(targetComment)
});

router.delete('/:commentId', requireAuth, async (req, res, next) => {
  const commentId = req.params.commentId;
  const { user } = req;

  const doomedComment = await Comment.findByPk(commentId);

  if (!doomedComment) {
    const err = new Error("Comment not found");
    err.status = 404;
    err.errors = ["Comment does not exist with the specified comment id"];
    return next(err)
  };

  await doomedComment.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: res.statusCode
  })
})

module.exports = router;
