const express = require('express');
const { User, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async(req, res) => {
  const songs = await Song.findAll();
  res.json({Songs: songs})
})

module.exports = router;
