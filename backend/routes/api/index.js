const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const artistsRouter = require('./artists.js');
const commentsRouter = require('./comments');
const playlistsRouter = require('./playlists');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/artists', artistsRouter);

router.use('/comments', commentsRouter);

router.use('/playlists', playlistsRouter);

module.exports = router;
