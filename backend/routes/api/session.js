const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError');
const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    if (!credential) {
      const err = newError(
        400,
        'Validation error',
        ['Email or username is required']);
      return next(err);
    };

    if (!password) {
      const err = newError(
        400,
        'Validation error',
        ['Password is required']
      )
      return next(err)
    }

    const user = await User.login({ credential, password });

    if (!user) {
      const err = newError(
        401,
        'Invalid credentials',
        'The provided credentials were invalid.',
        ['The provided credentials were invalid.']);
      return next(err);
    }

    const token = await setTokenCookie(res, user);
    user.dataValues.token = token;

    return res.json(
      user
    );
  }
);

// Log out
router.delete(
  '/',
 (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get(
  '/',
  restoreUser,
  requireAuth,
  async (req, res) => {
    const { user } = req;
    // const token = await setTokenCookie(res, user);
    // user.dataValues.token = token;
    if (user) {
      return res.json(
        user.toSafeObject(),
        // token
      );
    } else return res.json({});
  }
);

module.exports = router;
